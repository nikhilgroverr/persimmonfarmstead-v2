import type { Metadata } from "next";
import RoomDetail from "@/components/RoomDetail";
import { getRoom } from "@/lib/rooms";

const room = getRoom("3bhk-cottage")!;

export const metadata: Metadata = {
  title: `${room.name} · Persimmon Farmstead Shanag, Bahang`,
  description: room.short,
};

export default function ThreeBhkCottagePage() {
  return <RoomDetail room={room} />;
}