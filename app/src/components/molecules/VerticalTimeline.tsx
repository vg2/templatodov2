import { ScrollArea } from "@/components/atoms/ScrollArea"
import { Card, CardContent } from "@/components/atoms/Card"
import type { ExistingTodoItem } from "@/model/TodoItem.type";

type TimelineTodoItem = {
    hour: string;
    item: ExistingTodoItem;
}

type VerticalTimelineProps = {
    items: TimelineTodoItem[];
}

export default function VerticalTimeline({ items }: VerticalTimelineProps) {
    const groupedItems = Object.groupBy(items, i => i.hour);
    const mappedItems = Object.keys(groupedItems).map(k => ({ hour: k, items: groupedItems[k]?.map(i => i.item) ?? [] }));

    return (
        <Card className="mx-auto w-full max-w-3xl">
            <CardContent className="p-6">
                <ScrollArea className="h-[600px] pr-4">
                    <div className="relative flex">
                        {/* Timeline */}
                        <div className="absolute top-0 bottom-0 left-9 w-px bg-border" />

                        {/* Content */}
                        <div className="w-full">
                            {mappedItems.map(({ hour, items }) => (
                                <div key={hour} className="mb-8 flex">
                                    {/* Hour indicator */}
                                    <div className="flex w-20 flex-shrink-0 items-center justify-center">
                                        <div className="relative z-10 h-4 w-4 rounded-full bg-primary" />
                                        <span className="ml-2 font-medium text-sm">{`${hour}:00`}</span>
                                    </div>

                                    {/* Tasks */}
                                    <div className="ml-4 flex-grow">
                                        <div className={`rounded-lg bg-muted p-4 ${items.length > 1 ? 'space-y-2' : ''}`}>
                                            {items.map((item) => (
                                                <div key={item.id} className="text-sm">
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}