import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/joy";
import { DurationUnit } from "../data/DurationUnit.type";
import { timeSlotToDuration } from "../utils/timeslot-to-duration.function";
import { TodoState } from "../data/TodoState";

export type TodoCardInput = {
  todoId: number | undefined;
  name: string;
  description: string;
  timeSlot: string;
  time: string;
  duration: number;
  durationUnit: DurationUnit;
  state: TodoState;
  markDone: (todoId: number) => void;
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
        <Button disabled={state !== 'New'} variant="solid" color="primary" onClick={() => markDone(todoId)}>
          Done?
        </Button>
        <Button variant="outlined" color="neutral" onClick={() => openDetails(todoId)}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
