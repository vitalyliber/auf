import { db } from "@/db/db.mjs";
import { users } from "@/db/schema";
import Button from "@/app/_components/button";

export default async function Home() {
  // const result = await db.select().from(users);
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
          <div>{item.created_at.toString()}</div>
          <div>
            {item.devices.map((device) => (
              <div>{device.userAgent}</div>
            ))}
          </div>
        </div>
      ))}
      <Button />
    </main>
  );
}
