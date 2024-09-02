import { AllDurations, type DurationUnit } from "@app/common/DurationUnit.type";
import type { TodoItem } from "@app/model/TodoItem.type";
import {
	Stack,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Select,
	Option,
	Button,
} from "@mui/joy";
import { useForm, type Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { todoSchema } from "./manage-existing-todos.schema";
import { insertTodo } from "@app/service/insert-todo";
import { invalidateAllTodosQuery } from "../../queries/all-todos-query";

type AddTodoFormProps = {
	onSubmit: () => void;
};

export const AddTodoForm = ({ onSubmit }: AddTodoFormProps) => {
	const todoForm = useForm<TodoItem, Validator<TodoItem | unknown>>({
		validatorAdapter: zodValidator(),
		validators: { onChange: todoSchema, onSubmit: todoSchema },
		onSubmit: async ({ value }) => {
			await insertTodo(value);
			await invalidateAllTodosQuery();
			onSubmit();
		},
	});
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				todoForm.handleSubmit();
			}}
		>
			<Stack direction="column" gap={1}>
				<todoForm.Field name="name">
					{(field) => (
						<FormControl error={field.state.meta.errors.length > 0}>
							<FormLabel>Todo name</FormLabel>
							<Input
								value={field.state.value || ""}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Todo name"
							/>
						</FormControl>
					)}
				</todoForm.Field>

				<todoForm.Field name="description">
					{(field) => (
						<FormControl>
							<FormLabel>Description</FormLabel>
							<Textarea
								minRows={2}
								value={field.state.value || ""}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Description"
							/>
						</FormControl>
					)}
				</todoForm.Field>
				<Stack
					direction="row"
					gap={1}
					sx={{
						width: "100%",
						"& > *": {
							width: "50%",
							flex: 1,
						},
					}}
				>
					<todoForm.Field name="typicalDuration">
						{(field) => (
							<FormControl>
								<FormLabel>Typical duration</FormLabel>
								<Input
									type="number"
									value={field.state.value || 0}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(Number.parseInt(e.target.value, 10))}
									placeholder="Typical Duration"
								/>
							</FormControl>
						)}
					</todoForm.Field>
					<todoForm.Field name="typicalDurationUnit">
						{(field) => (
							<FormControl>
								<FormLabel>Unit</FormLabel>
								<Select
									defaultValue="Minutes"
									value={field.state.value || ""}
									onBlur={field.handleBlur}
									onChange={(_, val) =>
										val && field.handleChange(val as DurationUnit)
									}
									placeholder="Unit"
								>
									{AllDurations.map((duration) => (
										<Option key={duration} value={duration}>
											{duration}
										</Option>
									))}
								</Select>
							</FormControl>
						)}
					</todoForm.Field>
				</Stack>
				<Button type="submit">Save</Button>
			</Stack>
		</form>
	);
};
