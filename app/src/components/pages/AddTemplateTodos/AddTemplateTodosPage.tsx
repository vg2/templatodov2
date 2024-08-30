import { Stack, Typography } from "@mui/joy";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getTemplateQueryOptions, invalidateTemplateQuery } from "../../../queries/template-query";
import { getAllTodosQueryOptions } from "../../../queries/all-todos-query";
import { ManageExistingTodos } from "@app/components/organisms/ManageExistingTodos";
import { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";

export const AddTemplateTodosPage = () => {
    const { templateId } = useParams({ strict: false });
    const templateIdParsed = parseInt(templateId!);
    const { data: template } = useSuspenseQuery(getTemplateQueryOptions(templateIdParsed));
    const { data: allTodos } = useSuspenseQuery(getAllTodosQueryOptions())
    const navigate = useNavigate({ from: '/new-template' });

    const save = async (values: TodoItemInTemplate[]) => {
        console.log(values);



        await invalidateTemplateQuery(templateIdParsed);
        navigate({ to: '/edit-template/$templateId', params: { templateId: templateId! } });
    }
    return (
        <Stack spacing={1}>
            <Typography level='title-lg'>Add todo to {template.name}</Typography>
            <ManageExistingTodos template={template} allTodos={allTodos} save={save}/>
        </Stack>
    )
}
