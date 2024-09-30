import type { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/Card";

type TimelineCardItem = {
  id: string;
  title: string;
  content: string;
  hour: string;
};

type TimelineCardListProps = {
  items: TimelineCardItem[];
};

export const TimelineCardList: FC<TimelineCardListProps> = ({ items }) => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  const sortedItems = items.sort((a, b) => a.hour.localeCompare(b.hour));

  return (
    <div className="flex">
      <div className="w-16 flex-shrink-0">
        {hours.map((hour) => (
          <div key={hour} id={`hour-label-${hour}`} className="flex items-center justify-center border-gray-200 border-b min-h-[3rem]">
            {hour}
          </div>
        ))}
      </div>
      <div className="flex-grow">
        {hours.map((hour) => {
          const hourItems = sortedItems.filter((item) => item.hour.split(':')[0] === hour.split(':')[0]);
          return (
            <div key={hour} className="border-gray-200 border-b min-h-[3rem]">
              {hourItems.map((item) => (
                <Card key={item.id} className="m-1 bg-cocoa-200">
                  <CardHeader className="p-1">
                    <CardTitle className="text-xs font-medium">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-1 text-xs">{item.content}</CardContent>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};