import { db } from "@/db/db.mjs";
import { eq } from "drizzle-orm";
import { doors, users } from "@/db/schema.mjs";
import Form from "@/app/(form)/[slug]/_components/form";
import { redirect } from "next/navigation";
import { adminAppName, productionAppUrl } from "@/auf_next";

export const metadata = {
  title: "Sign In",
};

export default async function LoginPage({ params }) {
  let door = await db.query.doors.findFirst({
    where: eq(doors.name, params.slug),
  });

  if (!door) {
    if (params.slug === adminAppName) {
      door = await db
        .insert(doors)
        .values({ name: adminAppName, domain: productionAppUrl })
        .returning();
      const user = await db
        .insert(users)
        .values({ email: "zenamax@gmail.com", doorId: door[0].id })
        .returning();
      await db
        .update(doors)
        .set({ userId: user[0].id })
        .where(eq(doors.id, door[0].id));
    } else {
      redirect("/");
    }
  }

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
