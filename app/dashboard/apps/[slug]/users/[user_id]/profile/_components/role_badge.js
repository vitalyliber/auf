"use client";

import { confirmAction } from "@/app/_components/utils";
import removeRole from "@/app/dashboard/apps/[slug]/users/[user_id]/profile/_actions/removeRole";
import { useFormState } from "react-dom";
import cn from "@/app/(landing)/_components/cn";
import { SubmitButton } from "@/app/_components/submit_button";

const initialState = {
  message: "",
};

export default function RoleBadge({ role, userId }) {
  const [state, formAction] = useFormState(removeRole, initialState);

  return (
    <div className="px-3 py-1 bg-black rounded text-white">
      <form action={confirmAction(formAction)}>
        {role}
        <input name="role" defaultValue={role} className="hidden" />
        <input name="userId" defaultValue={userId} className="hidden" />
        <p aria-live="polite" className={cn("hidden")}>
          {state?.message}
        </p>
        <SubmitButton unStyled className="ml-2">
          x
        </SubmitButton>
      </form>
    </div>
  );
}
