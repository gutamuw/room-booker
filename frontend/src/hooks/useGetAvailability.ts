import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

export type DayAvailability = {
  date: string;
  availableSlots: number[];
}

export type RoomAvailability = {
  roomId: string;
  roomName: string;
  capacity: number;
  days: DayAvailability[];
}

export type AvailabilityResponse = {
  from: string;
  to: string;
  rooms: RoomAvailability[];
}

const useGetAvailability = () => {
  const query = useQuery({
    queryKey: ["availability"],
    queryFn: () => apiFetch<AvailabilityResponse>("/bookings/availability"),
  });

  return { data: query.data, isLoading: query.isLoading, error: query.error };
};

export default useGetAvailability;
