import Navigation from "@/app/dashboard/_components/navigation";
import AppsList from "@/app/dashboard/_components/apps_list";

export default async function Dashboard() {
  return (
    <main className="flex space-x-10 px-16 py-7">
      <Navigation activeCategory="apps" />
      <AppsList />
    </main>
  );
}
