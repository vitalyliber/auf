import Navigation from "@/app/dashboard/_components/navigation";
import AppsList from "@/app/dashboard/_components/apps_list";
import Container from "@/app/dashboard/_components/container";

export const metadata = {
  title: "Dashboard | Auf",
};

export default async function Dashboard({ searchParams }) {
  return (
    <Container>
        <Navigation activeCategory="apps" />
        <AppsList query={searchParams?.query} />
    </Container>
  );
}
