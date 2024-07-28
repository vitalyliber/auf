import Navigation from "@/app/dashboard/_components/navigation";
import AppsList from "@/app/dashboard/_components/apps_list";

export const metadata = {
  title: "Dashboard | Auf",
};

export default async function Dashboard({ searchParams }) {
  return (
    <main className="flex space-x-10 px-16 py-7">
      <Navigation activeCategory="apps" />
      <AppsList query={searchParams?.query} />
    </main>
  );
}
