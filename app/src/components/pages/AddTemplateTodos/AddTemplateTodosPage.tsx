import { Stack, Typography } from "@mui/joy";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getTemplateQueryOptions, invalidateTemplateQuery } from "../../../queries/template-query";
import { getAllTodosQueryOptions } from "../../../queries/all-todos-query";
import { TodoItem } from "@app/model/TodoItem.type";
import { ManageExistingTodos } from "@app/components/organisms/ManageExistingTodos";

export const AddTemplateTodosPage = () => {
    const { templateId } = useParams({ strict: false });
    const templateIdParsed = parseInt(templateId!);
    const { data: template } = useSuspenseQuery(getTemplateQueryOptions(templateIdParsed));
    const { data: allTodos } = useSuspenseQuery(getAllTodosQueryOptions())
    const navigate = useNavigate({ from: '/new-template' });

    const toggleTodoInTemplate = async (todo: TodoItem) => {
        console.log(todo);



        await invalidateTemplateQuery(templateIdParsed);
        navigate({ to: '/edit-template/$templateId', params: { templateId: templateId! } });
    }
    return (
        <Stack spacing={1}>
            <Typography level='title-lg'>Add todo to {template.name}</Typography>
            <ManageExistingTodos todosInTemplate={template.todos} allTodos={allTodos} toggleTodoInTemplate={toggleTodoInTemplate} />
        </Stack>
    )
}
