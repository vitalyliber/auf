import { fmtDateWithTime } from "@/app/_components/utils";
import { db } from "@/db/db.mjs";
import Th from "@/app/dashboard/_components/th";
import Td from "@/app/dashboard/_components/td";
import PageTitle from "@/app/dashboard/_components/page_title";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { doors } from "@/db/schema.mjs";
import { fetchCurrentUser } from "@/actions";

export default async function AppsList() {
  const currentUser = await fetchCurrentUser();
  const doorsList = await db.query.doors.findMany({
    where: eq(doors.userId, currentUser.id),
    with: {
      users: true,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-12">
        <PageTitle classNames="mb-0" title="Apps" />
        <div>
          <Link className="btn-black inline" href="/dashboard/connect">
            Add
          </Link>
        </div>

      </div>
      {doorsList.length === 0 && (
        <div className="flex justify-center items-center flex-col bg-gray-50 py-20 rounded-lg">
          <Link className="btn-black" href="/dashboard/connect">
            Connect a new App
          </Link>
        </div>
      )}
      {doorsList.length > 0 && (
        <>
          <input
            placeholder="Search"
            className="rounded border-gray-300 py-3 min-w-96 mb-8"
          />

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
                    <Td>{item.users.length}</Td>
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
