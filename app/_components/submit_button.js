"use client";

import { useFormStatus } from "react-dom";
import cn from "@/app/(landing)/_components/cn";

export function SubmitButton({ className, children } = {}) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        className={cn("btn-black mt-8", className)}
        type="submit"
        disabled={pending}
      >
        {children || "Submit"}
      </button>
    </>
  );
}
