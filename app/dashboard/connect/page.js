import AppForm from "@/app/dashboard/_components/app_form";
import Navigation from "@/app/dashboard/_components/navigation";

export default function Page() {
  return (
    <main className="flex space-x-10 px-16 py-7">
      <Navigation activeCategory="apps" />
      <AppForm />
    </main>
  );
}
