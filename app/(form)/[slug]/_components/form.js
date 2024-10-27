"use client";

import * as EmailValidator from "email-validator";

import { useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import useRunOnce from "@/hooks/useRunOnce";
import { confirmationAction, sendAuthCodeAction } from "@/actions";
import LoginIssues from "@/app/(form)/[slug]/_components/login-issues";
import PoweredBy from "@/app/(form)/[slug]/_components/powered-by";
import { temporaryTokenName } from "@/auf_next";

export default function Form({ appName, redirectUrl }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [codeStep, setCodeStep] = useState(false);
  const emailInput = useRef();
  const codeInput = useRef();
  const [codeValue, setCodeValue] = useState("");

  const handleLogin = async () => {
    if (isLoading) return;

    if (!EmailValidator.validate(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      setIsLoading(true);
      const res = await sendAuthCodeAction(email, appName);
      if (res.status === "success") {
        setCodeStep(true);
      }
      toast[res.status](res.title);
      setTimeout(() => codeInput.current?.focus(), 500);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useRunOnce(() => {
    emailInput.current?.focus();
  }, []);

  const handleConfirmation = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const res = await confirmationAction(codeValue, email, appName);
    if (res.status === "success") {
      let redirectUrlQuery = "";

      if (redirectUrl) {
        redirectUrlQuery = `&redirect_url=${redirectUrl}`;
      }

      const originUrl = new URL(redirectUrl).origin;

      window.location.href = `${originUrl}/api/auf?${temporaryTokenName}=${res.tmpToken}${redirectUrlQuery}`;
    }
    if (res.status === "error") {
      toast.error(res.title);
    }
    setIsLoading(false);
  };

  return (
    <>
      <h2 className="mt-4">
        {codeStep ? (
          <span>
            Please enter the{" "}
            <span className="font-bold">confirmation code</span>, that we sent
            to you by email {email}
          </span>
        ) : (
          "Enter your email address"
        )}
      </h2>

      {!codeStep && (
        <div className="mt-4 space-y-4">
          <label className="block">
            <input
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleLogin();
                }
              }}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailInput}
              placeholder="Email"
              autoComplete="email"
              name="email"
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <button
            className="md:p2-4 mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-2 text-base font-medium text-white no-underline transition-all hover:bg-green-700 md:px-10 md:text-lg disabled:bg-green-400"
            disabled={isLoading}
            type="submit"
            onClick={handleLogin}
          >
            Continue
          </button>
        </div>
      )}

      {codeStep && (
        <div className="mt-4 space-y-4">
          <label className="block">
            <input
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleConfirmation();
                }
              }}
              onChange={(e) => setCodeValue(e.target.value)}
              type="tel"
              pattern="[0-9]*"
              inputMode="numeric"
              name="code"
              placeholder="Code"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <button
            disabled={isLoading}
            className="md:p2-4 mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-2 text-base font-medium text-white no-underline transition-all hover:bg-green-700 md:px-10 md:text-lg disabled:bg-green-400"
            onClick={handleConfirmation}
            type="submit"
          >
            Submit
          </button>
        </div>
      )}

      <LoginIssues />
      <PoweredBy />
    </>
  );
}
