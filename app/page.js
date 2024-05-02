import { db } from "@/db/db.mjs";
import { users } from "@/db/schema";
import Button from "@/app/_components/button";

export default async function Home() {
  const result = await db.select().from(users);

  return (
    <main>
      {result.map((item) => (
        <div key={item.id}>
          <div>{item.email}</div>
          <div>{item.created_at.toString()}</div>
        </div>
      ))}
      <Button />
    </main>
  );
}
