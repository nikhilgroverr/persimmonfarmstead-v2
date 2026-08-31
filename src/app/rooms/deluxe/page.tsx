import type { Metadata } from "next";
import RoomDetail from "@/components/RoomDetail";
import { getRoom } from "@/lib/rooms";

const room = getRoom("deluxe")!;

export const metadata: Metadata = {
  title: `${room.name} · Persimmon Farmstead, Badgran (14 Mile)`,
  description: room.short,
};

export default function DeluxeRoomPage() {
  return <RoomDetail room={room} />;
}
