import { db } from "@/db/db.mjs";
import { eq } from "drizzle-orm";
import { devices } from "@/db/schema.mjs";
import NoResults from "@/app/dashboard/_components/no_results";
import Th from "@/app/dashboard/_components/th";
import Td from "@/app/dashboard/_components/td";
import { fmtDateWithTime } from "@/app/_components/utils";
import Link from "next/link";
import PageTitle from "@/app/dashboard/_components/page_title";

export async function DevicesList({ userId, email }) {
  const devicesList = await db.query.devices.findMany({
    where: eq(devices.userId, userId),
  });

  return (
    <div className="w-full">
      <PageTitle title={`User Devices (${email})`} />

      {devicesList.length === 0 && <NoResults />}

      {devicesList.length > 0 && (
        <div className="shadow-sm overflow-hidden my-8 w-full">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Created at</Th>
                <Th>Online at</Th>
                <Th>Devices</Th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {devicesList.map((item) => {
                const {
                  os: { name: osName, version: osVersion },
                  browser: { name: browserName, version: browserVersion },
                } = item.userAgent;

                return (
                  <tr key={item.id}>
                    <Td>
                      {osName}, {osVersion}, {browserName}, {browserVersion}
                    </Td>
                    <Td>{fmtDateWithTime(item.createdAt.toString())}</Td>
                    <Td>{fmtDateWithTime(item.onlineAt.toString())}</Td>
                    <Td className="font-semibold capitalize underline underline-offset-4">
                      <Link href={`/`}>Delete</Link>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
