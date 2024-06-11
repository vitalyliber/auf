"use client";

import { useFormStatus } from "react-dom";
import cn from "@/app/(landing)/_components/cn";

export function SubmitButton({ className, children, unStyled = false } = {}) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        className={cn(unStyled ? null : "btn-black mt-8", className)}
        type="submit"
        disabled={pending}
      >
        {children || "Submit"}
      </button>
    </>
  );
}
