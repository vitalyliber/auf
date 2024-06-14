import { fmtDateWithTime } from "@/app/_components/utils";
import { db } from "@/db/db.mjs";
import Th from "@/app/dashboard/_components/th";
import Td from "@/app/dashboard/_components/td";
import PageTitle from "@/app/dashboard/_components/page_title";
import { and, eq, ilike } from "drizzle-orm";
import { users } from "@/db/schema.mjs";
import { redirect } from "next/navigation";
import NoSearchResults from "@/app/dashboard/_components/no_search_results";
import SearchInput from "@/app/dashboard/_components/search_input";
import Link from "next/link";
import NoResults from "@/app/dashboard/_components/no_results";
import cn from "@/app/(landing)/_components/cn";

export default async function UsersList({
  doorName,
  doorId,
  query,
  usersCount,
  page,
}) {
  let filters = [eq(users.doorId, doorId)];
  if (query) {
    filters = [...filters, [ilike(users.email, `%${query}%`)]];
  }

  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  console.log("offset", offset);

  const getUsers = async () => {
    return db.query.users.findMany({
      orderBy: (users, { desc }) => desc(users.id),
      limit: pageSize,
      offset,
      where: and(...filters),
    });
  };

  const usersList = await getUsers();

  const currentListCount = usersList.length;

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
        <SearchInput query={query} />
      </form>

      {currentListCount > 0 || (!!query && <NoSearchResults />)}

      {currentListCount === 0 && !query && <NoResults />}

      {currentListCount > 0 && (
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
                  <Td>{fmtDateWithTime(item.onlineAt.toString())}</Td>
                  <Td className="font-semibold capitalize underline underline-offset-4">
                    <Link href={`/dashboard/apps/${doorName}/users/${item.id}`}>
                      {item.devicesCount}
                    </Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!query && (
        <div className="flex items-center font-bold">
          <Link
            className={cn("underline underline-offset-2 px-3", {
              invisible: page === 1,
            })}
            href={`/dashboard/apps/${doorName}/users?page=${page - 1}`}
          >
            {"<"}
          </Link>

          <div className="bg-gray-100 rounded-lg px-3 py-1 text-gray-800">{page}</div>
          <Link
            className={cn("underline underline-offset-2 px-3", {
              invisible: currentListCount + offset >= usersCount,
            })}
            href={`/dashboard/apps/${doorName}/users?page=${page + 1}`}
          >
            {">"}
          </Link>
        </div>
      )}
    </div>
  );
}
