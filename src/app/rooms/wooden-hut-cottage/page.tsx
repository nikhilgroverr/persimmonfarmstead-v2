import type { Metadata } from "next";
import RoomDetail from "@/components/RoomDetail";
import { getRoom } from "@/lib/rooms";

const room = getRoom("wooden-hut-cottage")!;

export const metadata: Metadata = {
  title: `${room.name} · Persimmon Farmstead Shanag, Bahang`,
  description: room.short,
};

export default function WoodenHutCottagePage() {
  return <RoomDetail room={room} />;
}