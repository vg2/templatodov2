import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import type { TodoItem } from "@app/model/TodoItem.type";
import { insertTodo } from "@app/service/insert-todo";
import { getAllTodosQueryKey } from "./all-todos-query";

const insertTodoMutationKey = 'insert-todo';

export const useInsertTodoMutation = () => useMutation({
    mutationKey: [insertTodoMutationKey],
    mutationFn: (todo: TodoItem) => insertTodo(todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [getAllTodosQueryKey] })
});