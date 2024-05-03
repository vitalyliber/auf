import { db } from "@/db/db.mjs";
import { eq } from "drizzle-orm";
import { doors } from "@/db/schema.mjs";

export default async function DoorPage({ params }) {
  const door = await db.query.doors.findFirst({
    where: eq(doors.name, params.slug),
  });

  return (
    <div>
      <div>Name</div>
      <div>{door.name}</div>
    </div>
  );
}
