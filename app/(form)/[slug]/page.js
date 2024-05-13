import { db } from "@/db/db.mjs";
import { eq } from "drizzle-orm";
import { doors } from "@/db/schema.mjs";
import Form from "@/app/(form)/[slug]/_components/form";

export default async function LoginPage({ params }) {
  const door = await db.query.doors.findFirst({
    where: eq(doors.name, params.slug),
  });

  return (
    <div className="container mx-auto mt-10 flex h-[50vh] items-center justify-center px-4 sm:px-0 md:h-[60vh]">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-bold text-zinc-700 capitalize">
          {door.name}
        </h1>

        <Form appName={door.name} />
      </div>
    </div>
  );
}
