import type { TemplateFormType } from "@app/model/Template.type";
import {
    FormControl,
    FormLabel,
    Input,
    Select,
    Option,
    Button,
} from "@mui/joy";
import { useForm, type Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { newTemplateSchema } from "./new-template.schema";
import { format, parse } from "date-fns";
import { DateFormat } from "@app/common/DateFormat";
import { useNavigate } from "@tanstack/react-router";
import { useInsertNewTemplateMutation } from "../../../queries/insert-new-template-mutation";

export const NewTemplatePage = () => {
    const navigate = useNavigate({ from: "/new-template" });
    const { mutateAsync: insertNewTemplate } = useInsertNewTemplateMutation();

    const form = useForm<TemplateFormType, Validator<TemplateFormType | unknown>>(
        {
            validatorAdapter: zodValidator(),
            validators: { onChange: newTemplateSchema, onSubmit: newTemplateSchema },
            onSubmit: async ({ value }) => {
                await insertNewTemplate(value);
                navigate({ to: "/" });
            },
            defaultValues: {
                cycleLength: 1,
                description: "",
                frequency: "Daily",
                name: "",
                startDate: new Date(),
            },
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
                        Errors: {field.state.meta.errors}
                    </FormControl>
                )}
            </form.Field>

            <form.Field name="description">
                {(field) => (
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Description"
                        />
                    </FormControl>
                )}
            </form.Field>

            <form.Field name="cycleLength">
                {(field) => (
                    <FormControl>
                        <FormLabel>Cycle Length</FormLabel>
                        <Input
                            type="number"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                                field.handleChange(Number.parseInt(e.target.value, 10))
                            }
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
                                val && field.handleChange(val as "Daily" | "Weekly" | "Monthly")
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
            <Button type="submit">Submit</Button>
        </form>
    );
};