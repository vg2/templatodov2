import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newTodoSchema } from "./manage-existing-todos.schema";
import { useInsertTodoMutation } from "../../queries/insert-todo-mutation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/atoms/Form";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { AllDurations, type DurationUnit } from "@app/common/DurationUnit.type";

import type { NewTodoItem } from "@app/model/TodoItem.type";
import type { FC } from "react";

type AddTodoFormProps = {
	onSubmit: () => void;
};

export const AddTodoForm: FC<AddTodoFormProps> = ({ onSubmit }) => {
	const { mutateAsync: insertTodo } = useInsertTodoMutation();

	const form = useForm<NewTodoItem>({
		resolver: zodResolver(newTodoSchema),
		defaultValues: {
			name: "",
			description: "",
			typicalDuration: 0,
			typicalDurationUnit: "Minutes" as DurationUnit,
		},
	});

	const handleSubmit = async (data: NewTodoItem) => {
		await insertTodo(data);
		onSubmit();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Todo name</FormLabel>
							<FormControl>
								<Input placeholder="Todo name" {...field} />
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
								<Textarea placeholder="Description" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="typicalDuration"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Typical duration</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Typical Duration"
										{...field}
										onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="typicalDurationUnit"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Unit</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Unit" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{AllDurations.map((duration) => (
											<SelectItem key={duration} value={duration}>
												{duration}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
				</div>

				<Button className="w-full bg-zorba-950" type="submit">Save</Button>
			</form>
		</Form>
	);
};
