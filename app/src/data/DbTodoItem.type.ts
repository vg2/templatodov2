import { DurationUnit } from "../common/DurationUnit.type";

export type DbTodoItem = {
  id: number;
  name: string;
  description: string;
  typicalDuration: number;
  typicalDurationUnit: DurationUnit;
}
