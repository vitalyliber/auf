import Navigation from "@/app/dashboard/_components/navigation";
import UsersList from "@/app/dashboard/_components/users_list";
import { db } from "@/db/db.mjs";
import { and, eq } from "drizzle-orm";
import { doors } from "@/db/schema.mjs";
import { fetchCurrentUser } from "@/actions";
import { redirect } from "next/navigation";

export default async function Dashboard({ params, searchParams }) {
  const currentUser = await fetchCurrentUser();

  const door = await db.query.doors.findFirst({
    where: and(eq(doors.name, params.slug), eq(doors.userId, currentUser.id)),
  });

  if (!door) {
    redirect("/dashboard");
  }

  return (
    <main className="flex space-x-10 px-16 py-7">
      <Navigation
        activeCategory="apps"
        // TODO add users_count here
        subItems={[
          {
            name: `All users (${door.usersCount})`,
            link: `/dashboard/apps/${params.slug}/users`,
            active: true,
          },
        ]}
      />
      <UsersList
        doorName={params.slug}
        doorId={door.id}
        query={searchParams?.query}
      />
    </main>
  );
}
