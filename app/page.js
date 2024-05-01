import { db } from "@/db";
import { users } from "@/schema";

export default async function Home() {
  const result = await db.select().from(users);

  return (
    <main>
      {result.map((item) => (
        <div key={item.id}>{item.email}</div>
      ))}
    </main>
  );
}
