import type { NewTimeSlotForm, TimeSlot } from "@app/model/TimeSlot.type";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { newTimeSlotSchema } from "./timeslot.schema";
import type { FC } from "react";
import { useForm, type Validator } from "@tanstack/react-form";
import {
	FormControl,
	FormLabel,
	Input,
	Select,
	Option,
	Button,
	Stack,
} from "@mui/joy";
import { AllDurations, type DurationUnit } from "@app/common/DurationUnit.type";
import { invalidateAllTimeslotsQuery } from "../../queries/all-timeslots-query";
import { useSaveTimeslotMutation } from "../../queries/save-timeslot-mutation";

type TimeSlotFormInputs = {
	timeSlot: NewTimeSlotForm;
	onSuccessfulSubmit: () => void;
};

export const TimeSlotForm: FC<TimeSlotFormInputs> = ({
	timeSlot,
	onSuccessfulSubmit,
}) => {
	const { mutateAsync: saveTimeslot } = useSaveTimeslotMutation();

	const form = useForm<NewTimeSlotForm, Validator<TimeSlot | unknown>>({
		validatorAdapter: zodValidator(),
		validators: { onChange: newTimeSlotSchema, onSubmit: newTimeSlotSchema },
		onSubmit: async ({ value }) => {
			await saveTimeslot(value as TimeSlot);
			await invalidateAllTimeslotsQuery();
			onSuccessfulSubmit();
		},
		defaultValues: timeSlot,
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<Stack spacing={1}>
				<form.Field name="name">
					{(field) => (
						<FormControl error={field.state.meta.errors.length > 0}>
							<FormLabel>Name</FormLabel>
							<Input
								value={field.state.value || ""}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Name"
							/>
						</FormControl>
					)}
				</form.Field>
				<form.Field name="description">
					{(field) => (
						<FormControl error={field.state.meta.errors.length > 0}>
							<FormLabel>Description</FormLabel>
							<Input
								value={field.state.value || ""}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Description"
							/>
						</FormControl>
					)}
				</form.Field>
				<Stack
					direction="row"
					spacing={1}
					justifyContent="space-evenly"
					sx={{
						width: "100%",
						"& > *": {
							width: "50%",
							flex: 1,
						},
					}}
				>
					<form.Field name="duration">
						{(field) => (
							<FormControl error={field.state.meta.errors.length > 0}>
								<FormLabel>Duration</FormLabel>
								<Input
									value={field.state.value || 0}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(Number.parseInt(e.target.value, 10))}
									placeholder="Duration"
								/>
							</FormControl>
						)}
					</form.Field>
					<form.Field name="durationUnit">
						{(field) => (
							<FormControl>
								<FormLabel>Duration unit</FormLabel>
								<Select
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(_, val) =>
										val && field.handleChange(val as DurationUnit)
									}
									placeholder="Frequency"
								>
									{AllDurations.map((d) => (
										<Option key={d} value={d}>
											{d}
										</Option>
									))}
								</Select>
							</FormControl>
						)}
					</form.Field>
				</Stack>
				<form.Field name="timeOfDay">
					{(field) => (
						<FormControl>
							<FormLabel>Time of day</FormLabel>
							<Input
								type="time"
								value={field.state.value || ""}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Time of day"
							/>
						</FormControl>
					)}
				</form.Field>
				<Stack
					direction="row"
					spacing={1}
					justifyContent="space-evenly"
					sx={{
						width: "100%",
						"& > *": {
							width: "50%",
							flex: 1,
						},
					}}
				>
					<Button type="submit">Save {timeSlot.name}</Button>
				</Stack>
			</Stack>
		</form>
	);
};
