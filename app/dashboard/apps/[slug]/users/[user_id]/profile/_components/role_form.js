"use client";

import { SubmitButton } from "@/app/_components/submit_button";
import { useFormState } from "react-dom";
import cn from "@/app/(landing)/_components/cn";
import addRole from "@/app/dashboard/apps/[slug]/users/[user_id]/profile/_actions/addRole";
import { useEffect, useRef } from "react";

const initialState = {
  message: "",
};

export default function RoleForm({ userId }) {
  const [state, formAction] = useFormState(addRole, initialState);
  const formRef = useRef();

  useEffect(() => {
    if (state.message.includes("successfully added")) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input
        placeholder="Role"
        required
        className="mt-5 default-input"
        type="text"
        name="role"
      />
      <input
        className="hidden"
        type="text"
        name="userId"
        defaultValue={userId}
      />
      <p aria-live="polite" className={cn("hidden")}>
        {state?.message}
      </p>
      <SubmitButton className="btn-black mt-8">Add</SubmitButton>
    </form>
  );
}
