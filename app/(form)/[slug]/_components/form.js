"use client";

import * as EmailValidator from "email-validator";

import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import useRunOnce from "@/hooks/useRunOnce";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { confirmationAction, sendAuthCodeAction } from "@/actions";
import LoginIssues from "@/app/(form)/[slug]/_components/login-issues";
import { adminAppName, appUrl, temporaryTokenName } from "@/auf_next";

export default function Form({ appName }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [inputCode, setInputCode] = useState(null);
  const searchParams = useSearchParams();
  const emailInput = useRef();
  const codeInput = useRef();

  const handleLogin = useCallback(
    async (formData) => {
      const formDataEmail = formData.get("email");
      if (!EmailValidator.validate(formDataEmail)) {
        toast.error("Please enter a valid email");
        return;
      }
      try {
        setIsLoading(true);
        const formEmail = formDataEmail;
        const res = await sendAuthCodeAction(formEmail, appName);
        if (res.status === "success") {
          setEmail(formEmail);
        }
        toast[res.status](res.title);
        setTimeout(() => codeInput.current?.focus(), 500);
      } catch {
      } finally {
        setIsLoading(false);
      }
    },
    [appName],
  );

  const handleConfirmation = useCallback(async () => {
    const res = await confirmationAction(inputCode, email, appName);
    if (res.status === "success") {
      let redirectUrlQuery = "";

      if (searchParams.get("redirect_url")) {
        redirectUrlQuery = `&redirect_url=${searchParams.get("redirect_url")}`;
      }

      router.push(
        `/api/auf?${temporaryTokenName}=${res.tmpToken}${redirectUrlQuery}`,
      );
      router.refresh();
    }
    if (res.status === "error") {
      toast.error(res.title);
    }
  }, [inputCode, router, email, appName, toast]);

  useRunOnce(() => {
    if (searchParams.get("redirect_url")) {
      toast.success("Login to continue");
    }
  }, [toast, searchParams]);

  useRunOnce(() => {
    emailInput.current?.focus();
  }, []);

  useEffect(() => {
    if (inputCode?.length === 4) {
      handleConfirmation();
    }
  }, [inputCode, handleConfirmation]);

  return (
    <>
      <h2 className="mt-4">
        {email ? (
          <span>
            Please enter the{" "}
            <span className="font-bold">confirmation code</span>, that we sent
            to you by email {email}
          </span>
        ) : (
          "Enter your email address"
        )}
      </h2>

      <form className="mt-4" action={email ? handleConfirmation : handleLogin}>
        <div className="grid grid-cols-1 gap-4">
          {!email && (
            <label className="block">
              <input
                ref={emailInput}
                placeholder="Email"
                disabled={email}
                name="email"
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          )}

          {email && (
            <label className="block">
              <input
                onChange={(e) =>
                  setInputCode(
                    (e.target.value?.length || 0) > 4
                      ? inputCode
                      : e.target.value,
                  )
                }
                value={inputCode}
                ref={codeInput}
                type="number"
                name="code"
                placeholder="Code"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          )}

          {!email && (
            <button
              className="md:p2-4 mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-2 text-base font-medium text-white no-underline transition-all hover:bg-green-700 md:px-10 md:text-lg"
              disabled={isLoading}
              type="submit"
            >
              Continue
            </button>
          )}

          <LoginIssues />
        </div>
      </form>
    </>
  );
}
