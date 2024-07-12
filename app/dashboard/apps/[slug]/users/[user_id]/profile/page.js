import { fetchCurrentUser } from "@/auf_next";
import { redirect } from "next/navigation";
import { db } from "@/db/db.mjs";
import { and, eq } from "drizzle-orm";
import { doors, users } from "@/db/schema.mjs";
import Navigation from "@/app/dashboard/_components/navigation";
import PageTitle from "@/app/dashboard/_components/page_title";
import RoleForm from "@/app/dashboard/apps/[slug]/users/[user_id]/profile/_components/role_form";
import RoleBadge from "@/app/dashboard/apps/[slug]/users/[user_id]/profile/_components/role_badge";
import cn from "@/app/(landing)/_components/cn";

export default async function UserProfilePage({ params }) {
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

  const roles = Object.keys(user.roles).filter((role) => user.roles[role]);

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
            active: false,
          },
          {
            name: `Profile`,
            link: `/dashboard/apps/${params.slug}/users/${params.user_id}/profile`,
            active: true,
          },
        ]}
      />
      <div className="w-full">
        <PageTitle title={`Profile (${currentUser.email})`} />

        <label className="font-semibold">User roles</label>

        <div className={cn({ "flex mt-4 flex-wrap gap-2": roles.length > 0 })}>
          {roles.map((role) => (
            <RoleBadge userId={user.id} role={role} key={role} />
          ))}
        </div>

        <RoleForm userId={user.id} />
      </div>
    </main>
  );
}
