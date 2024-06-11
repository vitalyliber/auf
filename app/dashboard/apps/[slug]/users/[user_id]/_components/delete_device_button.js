"use client";

import { useFormState } from "react-dom";
import { deleteDeviceAction } from "@/app/dashboard/apps/[slug]/users/[user_id]/_components/actions";
import { confirmAction } from "@/app/_components/utils";
import cn from "@/app/(landing)/_components/cn";
import { SubmitButton } from "@/app/_components/submit_button";

const initialState = {
  message: "",
};

export default function DeleteDeviceButton({ deviceId, appName, userId }) {
  const [state, formAction] = useFormState(deleteDeviceAction, initialState);

  return (
    <form action={confirmAction(formAction)}>
      <input name="device_id" value={deviceId} type="hidden" />
      <input name="app_name" value={appName} type="hidden" />
      <input name="user_id" value={userId} type="hidden" />
      <SubmitButton
        unStyled
        className="capitalize underline underline-offset-4"
      >
        Delete
      </SubmitButton>
      <p aria-live="polite" className={cn("text-red-600 mt-5")}>
        {state?.message}
      </p>
    </form>
  );
}
