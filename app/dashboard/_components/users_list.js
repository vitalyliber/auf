import { fmtDateWithTime } from "@/app/_components/utils";
import { db } from "@/db/db.mjs";
import Th from "@/app/dashboard/_components/th";
import Td from "@/app/dashboard/_components/td";
import PageTitle from "@/app/dashboard/_components/page_title";
import { eq } from "drizzle-orm";
import { users, doors } from "@/db/schema.mjs";

export default async function UsersList({ doorName }) {
  const door = await db.query.doors.findFirst({
    // TODO filter here by ownerId
    where: eq(doors.name, doorName),
  });

  const usersList = await db.query.users.findMany({
    where: eq(users.doorId, door.id),
    with: {
      devices: true,
    },
  });

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
    </div>
  );
}
