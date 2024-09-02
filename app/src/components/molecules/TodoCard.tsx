import type { DurationUnit } from "@app/common/DurationUnit.type";
import type { TodoState } from "@app/common/TodoState";
import { timeSlotToDuration } from "@app/utils/timeslot-to-duration.function";
import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/joy";

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
    <Card>
      <CardContent>
        <Typography level="title-lg">{name}</Typography>
        <Typography level="title-sm">{description}</Typography>
        <Chip>{timeSlot}: {timeSlotToDuration(time, duration, durationUnit)}</Chip>
      </CardContent>
      <CardActions>
        <Button disabled={state !== 'New'} variant="solid" color="primary" onClick={() => void markDone(todoId)}>
          Done?
        </Button>
        <Button variant="outlined" color="neutral" onClick={() => openDetails(todoId)}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
