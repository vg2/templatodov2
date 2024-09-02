import { AllDurations, DurationUnit } from "@app/common/DurationUnit.type";
import { TodoItem } from "@app/model/TodoItem.type";
import { Stack, FormControl, FormLabel, Input, Textarea, Select, Option, Button } from "@mui/joy";
import { useForm, Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { todoSchema } from "./manage-existing-todos.schema";
import { insertTodo } from "@app/service/insert-todo";
import { invalidateAllTodosQuery } from "../../queries/all-todos-query";

type AddTodoFormProps = {
    onSubmit: () => void;
}

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
				<todoForm.Field
					name="name"
					children={(field) => (
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
				/>

				<todoForm.Field
					name="description"
					children={(field) => (
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
				/>
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
					<todoForm.Field
						name="typicalDuration"
						children={(field) => (
							<FormControl>
								<FormLabel>Typical duration</FormLabel>
								<Input
									type="number"
									value={field.state.value || 0}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(parseInt(e.target.value))}
									placeholder="Typical Duration"
								/>
							</FormControl>
						)}
					/>
					<todoForm.Field
						name="typicalDurationUnit"
						children={(field) => (
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
					/>
				</Stack>
				<Button type="submit">Save</Button>
			</Stack>
		</form>
	);
};
