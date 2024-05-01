import { db } from "@/db";
import { users } from "@/schema";

export default async function Home() {
  const result = await db.select().from(users);

  return (
    <main>
      {result.map((item) => (
        <div key={item.id}>
          <div >{item.email}</div>
          <div >{item.timestamp}</div>
        </div>
      ))}
    </main>
  );
}
