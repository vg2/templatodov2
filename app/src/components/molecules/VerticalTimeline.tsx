import { ScrollArea } from "@/components/atoms/ScrollArea"
import { Card, CardContent } from "@/components/atoms/Card"
import type { ExistingTodoItem } from "@/model/TodoItem.type";
import { parse } from "date-fns";
import { Fragment } from "react/jsx-runtime";

type TimelineTodoItem = {
    hour: string;
    item: ExistingTodoItem;
}

type VerticalTimelineProps = {
    items: TimelineTodoItem[];
}

export default function VerticalTimeline({ items }: VerticalTimelineProps) {
    const groupedItems = Object.groupBy(items, i => i.hour);
    const todayString = new Date().toISOString().split('T')[0];
    const mappedItems = Object.keys(groupedItems)
        .map(k => ({ ordinal: parse(`${todayString} ${k}`, 'yyyy-MM-dd HH:mm', new Date()), hour: k, hourItems: groupedItems[k]?.map(i => i.item) ?? [] }));
    mappedItems.sort((a, b) => a.ordinal.getTime() - b.ordinal.getTime());

    return (
        <Card className="mx-auto w-full max-w-3xl bg-cloud-200">
            <CardContent className="p-0 pt-2">
                <ScrollArea className="h-auto pr-4">
                    <div className="relative flex">
                        {/* Timeline */}
                        <div className="absolute top-0 bottom-0 left-20 w-[1px] bg-zorba-200" />

                        {/* Content */}
                        <div className="w-full">
                            {mappedItems.map(({ hour, hourItems }) => (
                                <Fragment key={hour}>
                                <div key={hour} className="flex">
                                    {/* Hour indicator */}
                                    <div className="flex w-20 flex-shrink-0 items-center justify-center">
                                        <div className="relative z-10 h-4 w-4 rounded-full bg-zorba-800" />
                                        <span className="ml-2 font-medium text-sm">{`${hour}`}</span>
                                    </div>

                                    {/* Tasks */}
                                    <div className="ml-4 flex-grow">
                                        <div className={`rounded-lg bg-cararra-300 p-4 ${hourItems.length > 1 ? 'space-y-2' : ''}`}>
                                            {hourItems.map((item) => (
                                                <div key={item.id} className="text-sm">
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 mb-4 h-[1px] w-full bg-zorba-200"/>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}