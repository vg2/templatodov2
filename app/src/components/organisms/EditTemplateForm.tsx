import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { DateFormat } from "@app/common/DateFormat";
import type { FC } from "react";
import { editTemplateSchema } from "./edit-template.schema";
import { useUpdateTemplateMutation } from "../../queries/update-template-mutation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/atoms/Form";
import { Input } from "@/components/atoms/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";

import type { ExistingTemplate, ExistingTemplateForm } from "@app/model/Template.type";
import { Textarea } from "../atoms/Textarea";

type EditTemplateFormProps = {
	template: ExistingTemplate;
	onSuccessfulSubmit: () => Promise<void>;
};

export const EditTemplateForm: FC<EditTemplateFormProps> = ({
	template,
	onSuccessfulSubmit,
}) => {
	const { mutateAsync: updateTemplate } = useUpdateTemplateMutation();

	const form = useForm<ExistingTemplateForm>({
		resolver: zodResolver(editTemplateSchema),
		defaultValues: template,
	});

	const onSubmit = async (data: ExistingTemplateForm) => {
		await updateTemplate(data);
		onSuccessfulSubmit();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Template name</FormLabel>
							<FormControl>
								<Input placeholder="Template name" {...field} />
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
								<Textarea
									placeholder="Description"
									className="min-h-[80px]"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="cycleLength"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Cycle Length</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Cycle Length"
										{...field}
										onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="frequency"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Frequency</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select frequency" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="Daily">Daily</SelectItem>
										<SelectItem value="Weekly">Weekly</SelectItem>
										<SelectItem value="Monthly">Monthly</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="startDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Start date</FormLabel>
							<FormControl>
								<Input
									type="date"
									value={format(field.value, DateFormat)}
									onChange={(e) =>
										field.onChange(parse(e.target.value, DateFormat, new Date()))
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full bg-zorba-950">Save template</Button>
			</form>
		</Form>
	);
};
