import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/atoms/Form";
import { Textarea } from "@/components/atoms/Textarea";
import { Button } from "@/components/atoms/Button";
import type { FC } from "react";
import type { ActionedItemForm } from "@/model/TemplateInstance.type";
import { actionedTodoSchema } from "./actioned-todo-schema";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { AllTodoStates } from "@/common/TodoState";
import { cn } from "@/lib/utils";
import readingTimeSrc from "../../assets/reading-time.jpg";

type ActionTodoFormProps = {
	actionedItem: Partial<ActionedItemForm>;
	onSubmit: (actionedItem: ActionedItemForm) => Promise<void>;
};

export const ActionTodoForm: FC<ActionTodoFormProps> = ({ actionedItem, onSubmit }) => {
	const form = useForm<ActionedItemForm>({
		resolver: zodResolver(actionedTodoSchema),
		defaultValues: {
			state: actionedItem?.state ?? "New",
			comment: actionedItem?.comment,
			todoItemKey: actionedItem?.todoItemKey,
		},
	});

	const handleSubmit = async ({ state, comment, todoItemKey: todoItemId }: ActionedItemForm) => {
		const actionedItem: ActionedItemForm = {
			state,
			comment,
			todoItemKey: todoItemId,
		};
		await onSubmit(actionedItem);
	};

	return (
		<Form {...form}>
			<img src={readingTimeSrc} className="rounded"/>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="state"
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
							<FormControl>
								<ToggleGroup type="single" value={field.value} onValueChange={e => field.onChange(e)} className="flex w-full gap-2">
									<ToggleGroupItem value={AllTodoStates[0]} aria-label={AllTodoStates[0]} className={cn({  "bg-muted text-primary":field.value === AllTodoStates[0]}, "rounded p-2")}>
										New
									</ToggleGroupItem>
									<ToggleGroupItem value={AllTodoStates[1]} aria-label={AllTodoStates[1]} className={cn({  "bg-muted text-primary":field.value === AllTodoStates[1]}, "rounded p-2")}>
										Complete
									</ToggleGroupItem>
									<ToggleGroupItem value={AllTodoStates[2]} aria-label={AllTodoStates[2]} className={cn({  "bg-muted text-primary":field.value === AllTodoStates[2]}, "rounded p-2")}>
										Did not complete
									</ToggleGroupItem>
								</ToggleGroup>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="comment"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Comment</FormLabel>
							<FormControl>
								<Textarea placeholder="Comment" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<Button className="w-full" type="submit">Save</Button>
			</form>
		</Form>
	);
};
