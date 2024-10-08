import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/atoms/Form";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { Button } from "@/components/atoms/Button";
import type { FC } from "react";
import type { ActionedItem } from "@/model/TemplateInstance.type";
import { actionedTodoSchema } from "./actioned-todo-schema";

type AddTodoFormProps = {
	actionedItem: Partial<ActionedItem>;
	onSubmit: () => void;
};

export const AddTodoForm: FC<AddTodoFormProps> = ({ actionedItem, onSubmit }) => {
	// const { mutateAsync: insertTodo } = useInsertTodoMutation();

	const form = useForm<ActionedItem>({
		resolver: zodResolver(actionedTodoSchema),
		defaultValues: {
			state: actionedItem?.state,
			comment: actionedItem?.comment,
			todoItemId: actionedItem?.todoItemId,
			timestamp: actionedItem?.timestamp
		},
	});

	const handleSubmit = async (data: ActionedItem) => {
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
