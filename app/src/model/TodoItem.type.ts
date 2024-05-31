import { DurationUnit } from "../common/DurationUnit.type";

export type TodoItem = {
  id?: number;
  name: string;
  description: string;
  typicalDuration: number;
  typicalDurationUnit: DurationUnit;
}
