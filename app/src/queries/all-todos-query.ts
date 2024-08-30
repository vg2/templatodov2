import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { getAllTodos } from "@app/service/get-all-todos";

const getAllTodosQueryKey = 'get-todos';

export const getAllTodosQueryOptions = () => queryOptions({
  queryKey: [getAllTodosQueryKey],
  queryFn: () => getAllTodos()
})

export const invalidateAllTodosQuery = async () => {
  await queryClient.invalidateQueries({ queryKey: [getAllTodosQueryKey] });
}
