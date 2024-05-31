import { DurationUnit } from "./DurationUnit.type";

export type TodoItem = {
  id?: string;
  name: string;
  description: string;
  typicalDuration: number;
  typicalDurationUnit: DurationUnit;
}
