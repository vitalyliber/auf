import cn from "@/app/(landing)/_components/cn";

export default function PageTitle({ title, classNames }) {
  return <h1 className={cn("text-4xl mb-12 inline-block", classNames)}>{title}</h1>;
}
