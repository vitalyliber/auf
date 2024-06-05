import { fmtDateWithTime } from "@/app/_components/utils";
import { db } from "@/db/db.mjs";
import Th from "@/app/dashboard/_components/th";
import Td from "@/app/dashboard/_components/td";
import PageTitle from "@/app/dashboard/_components/page_title";
import { and, eq, ilike } from "drizzle-orm";
import { users, doors } from "@/db/schema.mjs";
import { fetchCurrentUser } from "@/actions";
import { redirect } from "next/navigation";
import NoResults from "@/app/dashboard/_components/no_results";
import SearchInput from "@/app/dashboard/_components/search_input";

export default async function UsersList({ doorName, query }) {
  const currentUser = await fetchCurrentUser();

  const door = await db.query.doors.findFirst({
    where: and(eq(doors.name, doorName), eq(doors.userId, currentUser.id)),
  });

  let filters = [eq(users.doorId, door.id)];
  if (query) {
    filters = [...filters, [ilike(users.email, `%${query}%`)]];
  }

  const usersList = await db.query.users.findMany({
    where: and(...filters),
    with: {
      devices: true,
    },
  });

  async function searchAction(formData) {
    "use server";

    const search = formData.get("search");
    let queryString = "";

    if (search) {
      queryString = `?query=${encodeURIComponent(search)}`;
    }

    redirect(`/dashboard/apps/${doorName}/users${queryString}`);
  }

  return (
    <div className="w-full">
      <PageTitle title="Users" />
      <form action={searchAction} method="GET">
        <SearchInput query={query}/>
      </form>

      {usersList.length > 0 || (!!query && <NoResults />)}

      {usersList.length > 0 && (
        <div className="shadow-sm overflow-hidden my-8 w-full">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <Th>Email</Th>
                <Th>App</Th>
                <Th>Created at</Th>
                <Th>Online at</Th>
                <Th>Devices</Th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {usersList.map((item) => (
                <tr key={item.id}>
                  <Td>{item.email}</Td>
                  <Td>Auf.</Td>
                  <Td>{fmtDateWithTime(item.createdAt.toString())}</Td>
                  <Td>{fmtDateWithTime(new Date())}</Td>
                  <Td>{item.devices.length}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
