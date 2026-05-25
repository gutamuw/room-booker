import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "../lib/api"

export type Booking = {
  id: string;
  roomName: string;
  capacity: number;
  userId: string;
  date: string;
  slot: number;
}

type GetBookingsResponse = {
  bookings: Booking[];
}

const useGetBookings = () => {

    const query = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            return apiFetch<GetBookingsResponse>("/bookings/me");
        }
    })

    return { bookings: query.data?.bookings ?? [], isLoading: query.isLoading };
}

export default useGetBookings;