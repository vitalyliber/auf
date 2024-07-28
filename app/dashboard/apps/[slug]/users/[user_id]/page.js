import Navigation from "@/app/dashboard/_components/navigation";
import { fetchCurrentUser } from "@/auf_next";
import { db } from "@/db/db.mjs";
import { and, eq } from "drizzle-orm";
import { doors, users } from "@/db/schema.mjs";
import { redirect } from "next/navigation";
import { DevicesList } from "@/app/dashboard/apps/[slug]/users/[user_id]/_components/devices_list";

export const metadata = {
  title: "Sessions",
};

export default async function DevicesPage({ params }) {
  const currentUser = await fetchCurrentUser();

  if (!currentUser?.id) {
    redirect("/dashboard");
  }

  const door = await db.query.doors.findFirst({
    where: and(eq(doors.name, params.slug), eq(doors.userId, currentUser.id)),
  });

  if (!door) {
    redirect("/dashboard");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, params.user_id),
  });

  return (
    <main className="flex space-x-10 px-16 py-7">
      <Navigation
        activeCategory="apps"
        subItems={[
          {
            name: `All users (${door.usersCount})`,
            link: `/dashboard/apps/${params.slug}/users`,
            active: false,
          },
          {
            name: `All devices (${user.devicesCount})`,
            link: `/dashboard/apps/${params.slug}/users/${params.user_id}`,
            active: true,
          },
          {
            name: `Profile`,
            link: `/dashboard/apps/${params.slug}/users/${params.user_id}/profile`,
            active: false,
          },
        ]}
      />
      <DevicesList userId={user.id} email={user.email} appName={params.slug} />
    </main>
  );
}
