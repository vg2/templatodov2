import { ManageExistingTodos } from "@app/components/organisms/ManageExistingTodos";
import type { TodoItemInTemplate } from "@app/model/TodoItemInTemplate.type";
import { Button } from "@/components/atoms/Button";
import { H4} from "@/components/atoms/Typography";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getAllTodosQueryOptions } from "../../../queries/all-todos-query";
import { useSaveTodosInTemplateMutation } from "../../../queries/save-todos-in-template-mutation";
import { getTemplateQueryOptions } from "../../../queries/template-query";
import { ArrowLeft } from "lucide-react";
import { SuspenseLoader } from "@/components/molecules/SuspenseLoader";

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
        <div className="space-y-4 text-zorba-800">
            <div className="flex items-center gap-4">
                <Button onClick={navigateBack} variant="link">
                    <ArrowLeft />
                </Button>
                <H4>Manage {template.name} todos</H4>
            </div>
            <SuspenseLoader>
                <ManageExistingTodos
                    template={template}
                    allTodos={allTodos}
                    save={save}
                />
            </SuspenseLoader>
        </div>
    );
};
