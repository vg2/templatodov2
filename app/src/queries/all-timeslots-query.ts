import { queryOptions } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { getAllTimeslots } from "@app/service/get-all-timeslots";

const getAllTimeslotsQueryKey = 'get-timeslots';

export const getAllTimeslotsQueryOptions = () => queryOptions({
  queryKey: [getAllTimeslotsQueryKey],
  queryFn: () => getAllTimeslots()
})

export const invalidateAllTimeslotsQuery = async () => {
  await queryClient.invalidateQueries({ queryKey: [getAllTimeslotsQueryKey] });
}
