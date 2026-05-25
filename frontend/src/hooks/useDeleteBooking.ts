import { useMutation, useQuery } from "@tanstack/react-query"
import { apiFetch } from "../lib/api"
import { queryClient } from "../lib/queryClient";

const useDeleteBooking = () => {

    return useMutation({
        mutationFn: ({ bookingId }: { bookingId: string }) => apiFetch(`/bookings/${bookingId}`, {
            method: "DELETE",
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        }
    })
}

export default useDeleteBooking;