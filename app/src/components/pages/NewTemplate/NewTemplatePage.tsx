import { TemplateFormType } from "@app/model/Template.type";
import { FormControl, FormLabel, Input, Select, Option, Button } from "@mui/joy";
import { useForm, Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { newTemplateSchema } from "./new-template.schema";
import { format, parse } from "date-fns";
import { insertTemplate } from "@app/service/insert-template";
import { DateFormat } from "@app/common/DateFormat";
import { useNavigate } from "@tanstack/react-router";

export const NewTemplatePage = () => {
    const navigate = useNavigate({ from: '/new-template' });

    const form = useForm<TemplateFormType, Validator<TemplateFormType | unknown>>({
        validatorAdapter: zodValidator(),
        validators: { onChange: newTemplateSchema, onSubmit: newTemplateSchema },
        onSubmit: async ({ value }) => {
            await insertTemplate(value);
            navigate({ to: '/'});
        },
        defaultValues: {
            cycleLength: 1,
            description: '',
            frequency: 'Daily',
            name: '',
            startDate: new Date(),
        },
    });



    return (
        <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}>
            <form.Field
                name="name"
                children={(field) => (
                    <FormControl
                        error={field.state.meta.errors.length > 0}
                    >
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
            />

            <form.Field
                name="description"
                children={(field) => (
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
            />

            <form.Field
                name="cycleLength"
                children={(field) => (
                    <FormControl>
                        <FormLabel>Cycle Length</FormLabel>
                        <Input
                            type="number"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(parseInt(e.target.value))}
                            placeholder="Cycle Length"
                        />
                    </FormControl>
                )}
            />

            <form.Field
                name="frequency"
                children={(field) => (
                    <FormControl>
                        <FormLabel>Frequency</FormLabel>
                        <Select
                            defaultValue="Daily"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(_, val) => val && field.handleChange(val as "Daily" | "Weekly" | "Monthly")}
                            placeholder="Frequency"
                        >
                            <Option value="Daily">Daily</Option>
                            <Option value="Weekly">Weekly</Option>
                            <Option value="Monthly">Monthly</Option>
                        </Select>
                    </FormControl>
                )}
            />

            <form.Field
                name="startDate"
                children={(field) => (
                    <FormControl>
                        <FormLabel>Start date</FormLabel>
                        <Input
                            type="date"
                            value={format(field.state.value, DateFormat)}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(parse(e.target.value, DateFormat, new Date()))}
                            placeholder="Description"
                        />
                    </FormControl>
                )}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}
