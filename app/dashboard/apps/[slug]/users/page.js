import Navigation from "@/app/dashboard/_components/navigation";
import UsersList from "@/app/dashboard/_components/users_list";

export default async function Dashboard({ params }) {
  return (
    <main className="flex space-x-10  px-16 py-7">
      <Navigation activeCategory="users" />
      <UsersList doorName={params.slug} />
    </main>
  );
}
