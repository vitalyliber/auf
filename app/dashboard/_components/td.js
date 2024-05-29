import cn from "@/app/(landing)/_components/cn";

export default function Td({ children, className }) {
  return (
    <td className={cn("border-b border-slate-100 p-4 pl-8 text-zinc-700 text-base", className)}>
      {children}
    </td>
  );
}
