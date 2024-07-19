import { Button, FormControl, FormLabel, Input, Select, Option } from "@mui/joy";
import { Template, TemplateFormType } from "@app/model/Template.type";
import { useForm, Validator } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { updateTemplate } from "@app/service/update-template";
import { format, parse } from "date-fns";
import { DateFormat } from "@app/common/DateFormat";
import { FC } from "react";
import { editTemplateSchema } from "./edit-template.schema";

type EditTemplateFormProps = { template: Template, onSuccessfulSubmit: () => Promise<void> }

export const EditTemplateForm: FC<EditTemplateFormProps> = ({ template, onSuccessfulSubmit }) => {
  const form = useForm<TemplateFormType, Validator<TemplateFormType | unknown>>({
    validatorAdapter: zodValidator(),
    validators: { onChange: editTemplateSchema, onSubmit: editTemplateSchema },
    onSubmit: async ({ value }) => {
      await updateTemplate(value);
      onSuccessfulSubmit();
    },
    defaultValues: template,
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

