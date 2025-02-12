import type { DurationUnit } from "../common/DurationUnit.type";

export type DbTodoItem = {
  key?: number;
  name: string;
  description: string;
  typicalDuration: number;
  typicalDurationUnit: DurationUnit;
}
