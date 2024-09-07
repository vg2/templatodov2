import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	Option,
	Stack,
	Textarea,
} from "@mui/joy";
import type { ExistingTemplate, TemplateFormType } from "@app/model/Template.type";
import { useForm, type Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { format, parse } from "date-fns";
import { DateFormat } from "@app/common/DateFormat";
import type { FC } from "react";
import { editTemplateSchema } from "./edit-template.schema";
import { useUpdateTemplateMutation } from "../../queries/update-template-mutation";

type EditTemplateFormProps = {
	template: ExistingTemplate;
	onSuccessfulSubmit: () => Promise<void>;
};

export const EditTemplateForm: FC<EditTemplateFormProps> = ({
	template,
	onSuccessfulSubmit,
}) => {
	const { mutateAsync: updateTemplate } = useUpdateTemplateMutation();

	const form = useForm<TemplateFormType, Validator<TemplateFormType | unknown>>(
		{
			validatorAdapter: zodValidator(),
			validators: {
				onChange: editTemplateSchema,
				onSubmit: editTemplateSchema,
			},
			onSubmit: async ({ value }) => {
				await updateTemplate(value);
				onSuccessfulSubmit();
			},
			defaultValues: template,
		},
	);

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
							<FormLabel>Template name</FormLabel>
							<Input
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Template name"
							/>
						</FormControl>
					)}
				</form.Field>

				<form.Field name="description">
					{(field) => (
						<FormControl>
							<FormLabel>Description</FormLabel>
							<Textarea
								minRows={2}
								value={field.state.value}
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
					<form.Field name="cycleLength">
						{(field) => (
							<FormControl>
								<FormLabel>Cycle Length</FormLabel>
								<Input
									type="number"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(Number.parseInt(e.target.value, 10))}
									placeholder="Cycle Length"
								/>
							</FormControl>
						)}
					</form.Field>

					<form.Field name="frequency">
						{(field) => (
							<FormControl>
								<FormLabel>Frequency</FormLabel>
								<Select
									defaultValue="Daily"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(_, val) =>
										val &&
										field.handleChange(val as "Daily" | "Weekly" | "Monthly")
									}
									placeholder="Frequency"
								>
									<Option value="Daily">Daily</Option>
									<Option value="Weekly">Weekly</Option>
									<Option value="Monthly">Monthly</Option>
								</Select>
							</FormControl>
						)}
					</form.Field>
				</Stack>

				<form.Field name="startDate">
					{(field) => (
						<FormControl>
							<FormLabel>Start date</FormLabel>
							<Input
								type="date"
								value={format(field.state.value, DateFormat)}
								onBlur={field.handleBlur}
								onChange={(e) =>
									field.handleChange(
										parse(e.target.value, DateFormat, new Date()),
									)
								}
								placeholder="Description"
							/>
						</FormControl>
					)}
				</form.Field>
				<Button type="submit">Save template</Button>
			</Stack>
		</form>
	);
};
