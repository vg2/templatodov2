
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { saveTimeSlot } from "@app/service/save-timeslot";
import type { TimeSlot } from "@app/model/TimeSlot.type";
import { getAllTimeslotsQueryKey } from "./all-timeslots-query";

const saveTimeslotMutationKey = 'save-timeslot';

export const useSaveTimeslotMutation = () => useMutation({
    mutationKey: [saveTimeslotMutationKey],
    mutationFn: (timeSlot: TimeSlot) => saveTimeSlot(timeSlot),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [getAllTimeslotsQueryKey] })
})