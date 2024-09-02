import type { TodoItem } from "@app/model/TodoItem.type";
import type { Template } from "@app/model/Template.type";
import type {
	TodoItemInTemplate,
	TodoItemInTemplateForm,
	TodoItemsInTemplateForm,
} from "@app/model/TodoItemInTemplate.type";
import {
	Checkbox,
	DialogContent,
	DialogTitle,
	List,
	ListItem,
	ListItemButton,
	ListItemDecorator,
	Modal,
	ModalDialog,
	Option,
	Select,
	Stack,
	Typography,
} from "@mui/joy";
import { useForm, type Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { managingExistingTodosSchema } from "./manage-existing-todos.schema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllTimeslotsQueryOptions } from "../../queries/all-timeslots-query";
import type { TimeSlot } from "@app/model/TimeSlot.type";
import { useState } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { TimeSlotForm } from "./TimeSlotForm";
import { Add, SaveAs } from "@mui/icons-material";
import { FloatingActionBar } from "../atoms/FloatingActionBar";
import RoundedButton from "../atoms/RoundedButton";

type ManagingExistingTodosInput = {
	allTodos: TodoItem[];
	template: Template;
	save: (todosInTemplate: TodoItemInTemplate[]) => Promise<void>;
};

const getDefaultFormValues = (
	allTodos: TodoItem[],
	todosInTemplate: TodoItemInTemplate[],
): TodoItemsInTemplateForm => {
	const formTodos: TodoItemInTemplateForm[] = allTodos.map((todo) => {
		const alreadyInTemplate = todosInTemplate.find(
			(x) => x.todoItem.id && x.todoItem.id === todo.id,
		);
		return alreadyInTemplate
			? { ...alreadyInTemplate, selected: true }
			: { todoItem: todo, selected: false };
	});

	return { todoItemsInTemplate: formTodos };
};

export const ManageExistingTodos = ({
	allTodos: todos,
	template,
	save,
}: ManagingExistingTodosInput) => {
	const { data: timeSlots } = useSuspenseQuery(getAllTimeslotsQueryOptions());

	const defaultValues = getDefaultFormValues(todos, template.todos);
	const [addTodoModalIsOpen, setAddTodoModalIsOpen] = useState<boolean>(false);
	const [addTimeslotModalIsOpen, setAddTimeslotModalIsOpen] =
		useState<boolean>(false);

	const form = useForm<
		TodoItemsInTemplateForm,
		Validator<TodoItemsInTemplateForm | unknown>
	>({
		validatorAdapter: zodValidator(),
		validators: {
			onChange: managingExistingTodosSchema,
			onSubmit: managingExistingTodosSchema,
		},
		onSubmit: async ({ value }) => {
			await save(value.todoItemsInTemplate.filter(t => t.selected) as TodoItemInTemplate[]);
		},
		defaultValues: defaultValues,
	});

	const handleTimeslotChange = (
		formChangeHandler: (updater: unknown) => void,
		timeSlotId: number | null,
	) => {
		if (timeSlotId === -1) {
			openAddTimeslotModal();
			return;
		}
		const timeSlot = timeSlots.find((t) => t.id === timeSlotId);
		formChangeHandler(timeSlot);
	};

	const handlePointsInCycleChange = (
		formChangeHandler: (updater: unknown) => void,
		selectedPoints: number[] | null,
	) => {
		formChangeHandler(selectedPoints);
	};

	const pointsInCycle = Array.from(
		{ length: template.cycleLength },
		(_, i) => i + 1,
	);

	const isSelected = () => true;

	const openAddTodoModal = () => setAddTodoModalIsOpen(true);
	const closeAddTodoModal = () => setAddTodoModalIsOpen(false);

	const openAddTimeslotModal = () => setAddTimeslotModalIsOpen(true);
	const closeAddTimeslotTodoModal = () => setAddTimeslotModalIsOpen(false);

	return (
		<>
			<Typography level="title-md">Todos</Typography>
			<div role="group" aria-labelledby="template-todos-group">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<List>
						<form.Field name="todoItemsInTemplate" mode="array">
							{(field) =>
								field.state.value.map((_, i) => (
									<ListItem key={field.state.value[i].todoItem.id}>
										<ListItemButton>
											<ListItemDecorator>
												<form.Field name={`todoItemsInTemplate[${i}].selected`}>
													{(subField) => {
														return (
															<Checkbox
																checked={subField.state.value}
																onChange={(e) =>
																	subField.handleChange(e.target.checked)
																}
															/>
														);
													}}
												</form.Field>
											</ListItemDecorator>
											<Stack direction="column" gap={1}>
												<Typography level="title-sm">
													{field.state.value[i].todoItem?.name ?? ""}
												</Typography>
												<Typography level="body-sm">
													{field.state.value[i].todoItem?.description ?? ""}
												</Typography>
												{isSelected() && (
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
														<form.Field
															name={`todoItemsInTemplate[${i}].timeSlot`}
														>
															{(subField) => (
																<Select
																	value={(subField.state.value as TimeSlot)?.id}
																	onChange={(_, val) =>
																		handleTimeslotChange(
																			subField.handleChange,
																			val,
																		)
																	}
																>
																	{timeSlots.map((ts) => (
																		<Option
																			key={ts.id}
																			value={ts.id}
																			label={ts.name}
																		>
																			{ts.name} | {ts.description}
																		</Option>
																	))}
																	<Option
																		key="add-new"
																		value={-1}
																		label="Add new timeslot..."
																	>
																		Add new timeslot...
																	</Option>
																</Select>
															)}
														</form.Field>
														<form.Field
															name={`todoItemsInTemplate[${i}].pointsInCycle`}
														>
															{(subField) => (
																<Select
																	value={subField.state.value as number[]}
																	multiple
																	onChange={(_, val) =>
																		handlePointsInCycleChange(
																			subField.handleChange,
																			val as number[],
																		)
																	}
																>
																	{pointsInCycle.map((point) => (
																		<Option key={point} value={point}>
																			{point}
																		</Option>
																	))}
																</Select>
															)}
														</form.Field>
													</Stack>
												)}
											</Stack>
										</ListItemButton>
									</ListItem>
								))
							}
						</form.Field>
					</List>
				</form>
			</div>
			<Modal open={addTodoModalIsOpen} onClose={closeAddTodoModal}>
				<ModalDialog>
					<DialogTitle>Add todo</DialogTitle>
					<DialogContent>Add a new todo</DialogContent>
					<AddTodoForm onSubmit={closeAddTodoModal} />
				</ModalDialog>
			</Modal>
			<Modal open={addTimeslotModalIsOpen} onClose={closeAddTimeslotTodoModal}>
				<ModalDialog>
					<DialogTitle>Add timeslot</DialogTitle>
					<DialogContent>Add a new timeslot</DialogContent>
					<TimeSlotForm
						timeSlot={{ templateId: template.id }}
						onSuccessfulSubmit={closeAddTimeslotTodoModal}
					/>
				</ModalDialog>
			</Modal>
			<FloatingActionBar>
				<RoundedButton onClick={openAddTodoModal}>
					<Add />
				</RoundedButton>
				<RoundedButton onClick={form.handleSubmit}>
					<SaveAs />
				</RoundedButton>
			</FloatingActionBar>
		</>
	);
};
