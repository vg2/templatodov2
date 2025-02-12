import { ScrollArea } from "@/components/atoms/ScrollArea";
import { Card, CardContent } from "@/components/atoms/Card";
import { parse } from "date-fns";
import { Fragment } from "react/jsx-runtime";
import type { TodoItemInTemplate } from "@/model/TodoItemInTemplate.type";
import type { ExistingTemplate } from "@/model/Template.type";
import { Checkbox } from "../atoms/Checkbox";
import { cn } from "@/lib/utils";

type TimelineTodoItem = {
    template: ExistingTemplate;
    templateItem: { item: TodoItemInTemplate; isDone: boolean };
};

type VerticalTimelineProps = {
    items: TimelineTodoItem[];
    markDone: (
        template: ExistingTemplate,
        templateItem: TodoItemInTemplate,
    ) => Promise<void>;
};

const getHourForTime = (timeOfDay: string): number =>
    Number.parseInt(timeOfDay.split(":")[0], 10);

export default function VerticalTimeline({ items, markDone }: VerticalTimelineProps) {
    const groupedItems: Partial<Record<string, TimelineTodoItem[]>> =
        Object.groupBy(
            items,
            (i) =>
                `${getHourForTime(i.templateItem.item.timeSlot.timeOfDay).toString().padStart(2, "0")}:00`,
        );
    const todayString = new Date().toISOString().split("T")[0];
    const mappedItems = Object.keys(groupedItems).map((k) => ({
        ordinal: parse(`${todayString} ${k}`, "yyyy-MM-dd HH:mm", new Date()),
        hour: k,
        hourItems: groupedItems[k]?.map((i) => ({ item: i.templateItem, template: i.template })) ?? [],
    }));
    mappedItems.sort((a, b) => a.ordinal.getTime() - b.ordinal.getTime());

    return (
        <Card className="mx-auto w-full max-w-3xl">
            <CardContent className="p-0 pt-2">
                <ScrollArea className="h-auto pr-4">
                    <div className="relative flex">
                        {/* Timeline */}
                        <div className="absolute top-0 bottom-0 left-24 w-[1px] bg-muted" />

                        {/* Content */}
                        <div className="w-full">
                            {mappedItems.map(({ hour, hourItems }) => (
                                <Fragment key={hour}>
                                    <div key={hour} className="flex">
                                        {/* Hour indicator */}
                                        <div className="flex w-20 flex-shrink-0 items-center justify-center">
                                            <div className="relative z-10 h-2 w-2 rounded-full bg-primary" />
                                            <span className="ml-2 font-medium text-sm">{hour === '00:00' ? 'Anytime' : hour}</span>
                                        </div>

                                        {/* Tasks */}
                                        <div className="ml-4 flex-grow">
                                            <div
                                                className={`rounded-lg p-4 ${hourItems.length > 1 ? "space-y-2" : ""}`}
                                            >
                                                {hourItems.map((item) => (
                                                    <div
                                                        key={item.item.item.todoItem.key}
                                                        className="flex flex-row items-center gap-1 text-sm"
                                                    >
                                                        <Checkbox
                                                            className="h-5 w-5 rounded-full"
                                                            onClick={() => markDone(item.template, item.item.item)}
                                                            checked={item.item.isDone}
                                                        />
                                                        <span className={cn({ "line-through": item.item.isDone })}>
                                                            {item.item.item.todoItem.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-4 h-[1px] w-full bg-muted" />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
