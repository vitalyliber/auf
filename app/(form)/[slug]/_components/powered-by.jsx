import Link from "next/link";
import { productionAppUrl } from "@/auf_next";

export default function PoweredBy() {
  return (
    <div className="absolute bottom-10 left-0 right-0">
      <div className="w-full flex justify-center">
        <Link href={productionAppUrl}>
          <span className="text-zinc-500 text-sm">Powered by</span>
          <span className="block text-center text-2xl font-semibold">Auf</span>
        </Link>
      </div>
    </div>
  );
}
