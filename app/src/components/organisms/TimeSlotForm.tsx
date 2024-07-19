import { TimeSlot, TimeSlotFormType } from "@app/model/TimeSlot.type";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { timeSlotSchema } from "./timeslot.schema";
import { FC } from "react";
import { useForm, Validator } from "@tanstack/react-form";
import { FormControl, FormLabel, Input, Select, Option, Button } from "@mui/joy";
import { AllDurations, DurationUnit } from "@app/common/DurationUnit.type";
import styles from './TimeSlotForm.module.css';

type TimeSlotFormInputs = {
  timeSlot: TimeSlot;
  onSuccessfulSubmit: () => Promise<void>;
}

export const TimeSlotForm: FC<TimeSlotFormInputs> = ({ timeSlot, onSuccessfulSubmit }) => {
  const form = useForm<TimeSlotFormType, Validator<TimeSlotFormType | unknown>>({
    validatorAdapter: zodValidator(),
    validators: { onChange: timeSlotSchema, onSubmit: timeSlotSchema },
    onSubmit: async ({ value }) => {
      console.log(value);
      onSuccessfulSubmit();
    },
    defaultValues: timeSlot,
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
      <form.Field
        name="id"
        children={(field) => (
          <FormControl
            error={field.state.meta.errors.length > 0}
          >
            <Input
              className={styles.hidden}
              type="hidden"
              value={field.state.value}
            />
          </FormControl>
        )}
      />
      <form.Field
        name="name"
        children={(field) => (
          <FormControl
            error={field.state.meta.errors.length > 0}
          >
            <FormLabel>Name</FormLabel>
            <Input
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Name"
            />
          </FormControl>
        )}
      />
      <form.Field
        name="description"
        children={(field) => (
          <FormControl
            error={field.state.meta.errors.length > 0}
          >
            <FormLabel>Description</FormLabel>
            <Input
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Description"
            />
          </FormControl>
        )}
      />
      <form.Field
        name="duration"
        children={(field) => (
          <FormControl
            error={field.state.meta.errors.length > 0}
          >
            <FormLabel>Duration</FormLabel>
            <Input
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(parseInt(e.target.value))}
              placeholder="Duration"
            />
          </FormControl>
        )}
      />
      <form.Field
        name="durationUnit"
        children={(field) => (
          <FormControl>
            <FormLabel>Duration unit</FormLabel>
            <Select
              defaultValue="Minutes"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(_, val) => val && field.handleChange(val as DurationUnit)}
              placeholder="Frequency"
            >
              {AllDurations.map((d) => (<Option key={d} value={d}>{d}</Option>))}
            </Select>
          </FormControl>
        )}
      />
      <form.Field
        name="timeOfDay"
        children={(field) => (
          <FormControl>
            <FormLabel>Time of day</FormLabel>
            <Input
              type="time"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Time of day"
            />
          </FormControl>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
