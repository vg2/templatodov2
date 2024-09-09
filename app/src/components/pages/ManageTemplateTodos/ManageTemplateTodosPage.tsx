import { ManageExistingTodos } from "@app/components/organisms/ManageExistingTodos";
import type { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";
import { Button, Stack, Typography } from "@mui/joy";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getAllTodosQueryOptions } from "../../../queries/all-todos-query";
import { useSaveTodosInTemplateMutation } from "../../../queries/save-todos-in-template-mutation";
import { getTemplateQueryOptions } from "../../../queries/template-query";
import { ArrowBack } from "@mui/icons-material";
import { SuspenseLoader } from "@app/components/atoms/SuspenseLoader";

export const ManageTemplateTodosPage = () => {
    const { templateId } = useParams({ strict: false });
    const templateIdParsed = Number.parseInt(templateId ?? "", 10);
    const result = useSuspenseQueries({
        queries: [
            getTemplateQueryOptions(templateIdParsed),
            getAllTodosQueryOptions(),
        ],
    });
    const { data: template } = result[0];
    const { data: allTodos } = result[1];

    const navigate = useNavigate({ from: "/new-template" });
    const { mutateAsync: saveTodosInTemplate } = useSaveTodosInTemplateMutation();

    const navigateBack = () => {
        navigate({
            to: "/edit-template/$templateId",
            params: { templateId: templateId ?? "" },
        });
    };

    const save = async (values: TodoItemInTemplate[]) => {
        await saveTodosInTemplate({
            templateId: templateIdParsed,
            todoItemsInTemplate: values,
        });
        navigateBack();
    };
    return (
        <Stack spacing={1}>
            <Stack direction="row" gap={1} alignItems="center">
                <Button onClick={navigateBack} variant="plain">
                    <ArrowBack />
                </Button>
                <Typography level="title-lg">Add todo to {template.name}</Typography>
            </Stack>
            <SuspenseLoader>
                <ManageExistingTodos
                    template={template}
                    allTodos={allTodos}
                    save={save}
                />
            </SuspenseLoader>
        </Stack>
    );
};
