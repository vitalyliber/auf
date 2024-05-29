import { fmtDateWithTime } from "@/app/_components/utils";
import { db } from "@/db/db.mjs";
import Th from "@/app/dashboard/_components/th";
import Td from "@/app/dashboard/_components/td";
import PageTitle from "@/app/dashboard/_components/page_title";
import Link from "next/link";

export default async function AppsList() {
  const doorsList = await db.query.doors.findMany({
    // TODO Filter here by ownerId
    with: {
      users: true,
    },
  });

  // TODO If the doors' list is empty, show the app form

  return (
    <div className="w-full">
      <PageTitle title="Users" />
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
                  <Link href={`/dashboard/apps/${item.name}/users`}>{item.name}</Link>
                </Td>
                <Td>{fmtDateWithTime(item.createdAt.toString())}</Td>
                <Td>{item.users.length}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
