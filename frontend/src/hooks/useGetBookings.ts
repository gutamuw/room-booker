import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../lib/api"

const useGetBookings = () => {

    const query = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            return apiFetch("/bookings");
        }
    })

    return { bookings: query.data ?? [], isLoading: query.isLoading };
}

export default useGetBookings;