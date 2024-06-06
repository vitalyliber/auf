import cn from "@/app/(landing)/_components/cn";
import Link from "next/link";

const Li = ({ name, active, link }) => (
  <li
    className={cn("capitalize hover:underline underline-offset-8", {
      underline: active,
    })}
  >
    <Link href={`${link || name}`}>{name}</Link>
  </li>
);

export default async function Navigation({ activeCategory, subItems }) {
  let items = [
    { name: "apps", link: "/dashboard", active: activeCategory === "apps" },
    { name: "settings", active: activeCategory === "settings" },
  ];

  if (subItems) {
    items = items.filter((item) => item.name === activeCategory);
  }

  return (
    <div className="w-72">
      {items.length > 1 && (
        <ul className="text-2xl space-y-4">
          {items.map((item) => (
            <Li key={item.name} {...item} />
          ))}
        </ul>
      )}
      {items.length === 1 && (
        <div className="space-y-6">
          <Link href={items[0].link}>
            <h2 className="text-2xl capitalize hover:underline underline-offset-8">
              {items[0].name}
            </h2>
          </Link>
          <ul className="space-y-4">
            {subItems.map((item) => (
              <Li key={item.name} {...item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
