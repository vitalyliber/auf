"use client";

import PageTitle from "@/app/dashboard/_components/page_title";
import { useFormState } from "react-dom";
import { createApp } from "@/app/dashboard/_components/actions";
import cn from "@/app/(landing)/_components/cn";
import {SubmitButton} from "@/app/_components/submit_button";

const initialState = {
  message: "",
};

export default function AppForm() {
  const [state, formAction] = useFormState(createApp, initialState);

  return (
    <div className="w-full">
      <PageTitle title="Create a new App" />

      <form action={formAction}>
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Name *</label>
            <input
              placeholder="Name"
              required
              disabled={false}
              name="name"
              type="text"
              className="mt-1 default-input"
            />
          </div>

          <div>
            <label className="font-semibold">Domain *</label>
            <input
              placeholder="Domain"
              required
              disabled={false}
              name="domain"
              type="text"
              className="mt-1 default-input"
            />
          </div>
        </div>
        <p aria-live="polite" className={cn("text-red-600", { "mt-5": true })}>
          {state?.message}
        </p>
        <SubmitButton className="btn-black mt-8" />
      </form>
    </div>
  );
}
