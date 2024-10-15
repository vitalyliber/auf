import Navigation from "@/app/dashboard/_components/navigation";
import UsersList from "@/app/dashboard/apps/[slug]/users/_components/users_list";
import { db } from "@/db/db.mjs";
import { and, eq } from "drizzle-orm";
import { doors } from "@/db/schema.mjs";
import { fetchCurrentUser } from "@/auf_next";
import { redirect } from "next/navigation";
import Container from "@/app/dashboard/_components/container";

export const metadata = {
  title: "Users",
};

export default async function Dashboard({ params, searchParams }) {
  const currentUser = await fetchCurrentUser();

  const door = await db.query.doors.findFirst({
    where: and(eq(doors.name, params.slug), eq(doors.userId, currentUser.id)),
  });

  if (!door) {
    redirect("/dashboard");
  }

  return (
    <Container>
      <Navigation
        activeCategory="apps"
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
        usersCount={door.usersCount}
        page={parseInt(searchParams?.page, 10) || 1}
      />
    </Container>
  );
}
