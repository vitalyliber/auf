import { db } from "@/db/db.mjs";
import { fmtDateWithTime } from "@/app/_components/utils";

export default async function Dashboard() {
  const users = await db.query.users.findMany({
    with: {
      devices: true,
    },
  });

  return (
    <main className="flex space-x-10  px-16 py-7">
      <ul className="w-72 space-y-4 text-xl">
        <li>Users</li>
        <li>Apps</li>
        <li>Settings</li>
      </ul>
      <div className="w-full">
        <h1 className="text-4xl mb-12">Users</h1>
        <input
          placeholder="Search"
          className="rounded border-gray-300 py-3 min-w-96 mb-8"
        />

        <div className="shadow-sm overflow-hidden my-8 w-full">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Email
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  App
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Created at
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Devices
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {users.map((item) => (
                <tr key={item.id}>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                    {item.email}
                  </td>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                    Auf.
                  </td>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                    {fmtDateWithTime(item.createdAt.toString())}
                  </td>
                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                    {item.devices.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
