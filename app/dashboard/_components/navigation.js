import cn from "@/app/(landing)/_components/cn";
import Link from "next/link";

const Li = ({ children, active, link }) => (
  <li
    className={cn("capitalize hover:underline underline-offset-8", {
      underline: active === children,
    })}
  >
    <Link href={`/dashboard/${link || children}`}>{children}</Link>
  </li>
);

export default async function Navigation({ activeCategory }) {


  return (
    <ul className="w-72 space-y-4 text-xl">
      <Li active={activeCategory} link="/">apps</Li>
      <Li active={activeCategory}>settings</Li>
    </ul>
  );
}
