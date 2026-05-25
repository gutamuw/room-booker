import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { queryClient } from "../lib/queryClient";

type CreateBookingInput = {
  roomId: string;
  date: string;
  slot: number;
};


const useCreateBooking = () => {
    return useMutation({
        mutationFn: async ({roomId, date, slot}: CreateBookingInput) => {
            return apiFetch(`/bookings/${roomId}`, {
                method: "POST",
                body: JSON.stringify({ date, slot }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["availability"] });
        }
    });
}

export default useCreateBooking;