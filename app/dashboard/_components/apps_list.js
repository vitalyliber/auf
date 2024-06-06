import { fmtDateWithTime } from "@/app/_components/utils";
import { db } from "@/db/db.mjs";
import Th from "@/app/dashboard/_components/th";
import Td from "@/app/dashboard/_components/td";
import PageTitle from "@/app/dashboard/_components/page_title";
import Link from "next/link";
import { and, eq, ilike } from "drizzle-orm";
import { doors } from "@/db/schema.mjs";
import { fetchCurrentUser } from "@/actions";
import { redirect } from "next/navigation";
import NoResults from "@/app/dashboard/_components/no_results";
import SearchInput from "@/app/dashboard/_components/search_input";

export default async function AppsList({ query }) {
  const currentUser = await fetchCurrentUser();

  if (!currentUser?.id) {
    redirect('/')
  }

  let filters = [eq(doors.userId, currentUser.id)];
  if (query) {
    filters = [...filters, [ilike(doors.name, `%${query}%`)]];
  }

  const doorsList = await db.query.doors.findMany({
    where: and(...filters)
  });

  async function searchAction(formData) {
    "use server";

    const search = formData.get("search");
    let queryString = "";

    if (search) {
      queryString = `?query=${encodeURIComponent(search)}`;
    }

    redirect(`/dashboard${queryString}`);
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-12">
        <PageTitle classNames="mb-0" title="Apps"/>
        <div>
          <Link className="btn-black inline" href="/dashboard/connect">
            Add
          </Link>
        </div>
      </div>
      <form action={searchAction}>
        <SearchInput query={query}/>
      </form>
      {doorsList.length === 0 && !query && (
        <div className="flex justify-center items-center flex-col bg-gray-50 py-20 rounded-lg">
          <Link className="btn-black" href="/dashboard/connect">
            Connect a new App
          </Link>
        </div>
      )}
      {doorsList.length > 0 || (!!query && <NoResults/>)}
      {doorsList.length > 0 && (
        <>
          <div className="shadow-sm overflow-hidden my-8 w-full">
            <table className="border-collapse table-auto w-full text-sm">
              <thead>
              <tr>
                <Th>Name</Th>
                <Th>Created at</Th>
                <Th>Users</Th>
              </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800">
              {doorsList.map((item) => (
                <tr key={item.id}>
                  <Td className="font-semibold capitalize underline underline-offset-4">
                    <Link href={`/dashboard/apps/${item.name}/users`}>
                      {item.name}
                    </Link>
                  </Td>
                  <Td>{fmtDateWithTime(item.createdAt.toString())}</Td>
                  <Td>{item.usersCount}</Td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
