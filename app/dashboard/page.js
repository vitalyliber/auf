import { db } from "@/db/db.mjs";
import Button from "@/app/(landing)/_components/button";

export default async function Dashboard() {
  const users = await db.query.users.findMany({
    with: {
      devices: true,
    },
  });

  return (
    <main>
      {users.map((item) => (
        <div key={item.id}>
          <div>{item.email}</div>
          <div>{item.createdAt.toString()}</div>
          <div>
            {item.devices.map((device) => (
              <div key={device.id}>{device.userAgent}</div>
            ))}
          </div>
        </div>
      ))}
      <Button />
    </main>
  );
}
