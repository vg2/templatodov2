import type { DurationUnit } from "@app/common/DurationUnit.type";
import type { TodoState } from "@app/common/TodoState";
import { timeSlotToDuration } from "@app/utils/timeslot-to-duration.function";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../atoms/Card";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { Checkbox } from "../atoms/Checkbox";

export type TodoCardInput = {
  todoId: number;
  name: string;
  description: string;
  timeSlot: string;
  time: string;
  duration: number;
  durationUnit: DurationUnit;
  state: TodoState;
  markDone: (todoId: number) => Promise<void>;
  openDetails: (todoId: number) => void;
};
export const TodoCard: (input: TodoCardInput) => JSX.Element = ({ todoId, name, description, timeSlot, time, duration, durationUnit, state, markDone, openDetails }) => {
  return (
    <Card className="pt-1">
      <CardHeader className="p-2 ">
        <div className="flex flex-row items-center gap-2">
          <div>
            <Checkbox
              className="h-7 w-7 rounded-full border-2 border-gray-400"
              disabled={state !== 'New'}
              checked={state !== 'New'}
              onClick={() => void markDone(todoId)} /></div>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <Badge>{timeSlot}: {timeSlotToDuration(time, duration, durationUnit)}</Badge>
          <Button variant="secondary" color="neutral" onClick={() => openDetails(todoId)}>
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
