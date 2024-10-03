import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newTimeSlotSchema } from "./timeslot.schema";
import { useSaveTimeslotMutation } from "../../queries/save-timeslot-mutation";
import { invalidateAllTimeslotsQuery } from "../../queries/all-timeslots-query";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/atoms/Form";
import { Input } from "@/components/atoms/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { AllDurations } from "@app/common/DurationUnit.type";

import type { NewTimeSlotForm, TimeSlot } from "@app/model/TimeSlot.type";
import type { FC } from "react";

type TimeSlotFormInputs = {
	timeSlot: NewTimeSlotForm;
	onSuccessfulSubmit: () => void;
};

export const TimeSlotForm: FC<TimeSlotFormInputs> = ({
	timeSlot,
	onSuccessfulSubmit,
}) => {
	const { mutateAsync: saveTimeslot } = useSaveTimeslotMutation();

	const form = useForm<NewTimeSlotForm>({
		resolver: zodResolver(newTimeSlotSchema),
		defaultValues: timeSlot,
	});

	const handleSubmit = async (data: NewTimeSlotForm) => {
		await saveTimeslot(data as TimeSlot);
		await invalidateAllTimeslotsQuery();
		onSuccessfulSubmit();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Name" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder="Description" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="duration"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Duration</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Duration"
										{...field}
										onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="durationUnit"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Duration unit</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Duration unit" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{AllDurations.map((d) => (
											<SelectItem key={d} value={d}>
												{d}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="timeOfDay"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time of day</FormLabel>
							<FormControl>
								<Input
									type="time"
									placeholder="Time of day"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button className="bg-zorba-950" type="submit">Save {timeSlot.name}</Button>
			</form>
		</Form>
	);
};
