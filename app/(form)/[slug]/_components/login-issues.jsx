import { useState } from "react";
import cx from "classnames";

export default function LoginIssues() {
  const [issues, setIssues] = useState();

  const email = "admin@mail.casply.com";

  return (
    <div className="relative">
      <p
        onClick={() => setIssues(!issues)}
        className={cx(
          "mt-4 cursor-pointer text-sm text-gray-500 hover:text-gray-700",
          { "font-semibold": issues },
        )}
      >
        {issues ? "Close" : "Need help?"}
      </p>
      {issues && (
        <div className="absolute top-10">
          <p className="mt-4 text-sm text-gray-700">
            If you don&apos;t receive a confirmation code, check your spam
            folder.
            <br />
            <br />
            If login problems cannot be resolved, please email{" "}
            <a
              className="font-bold text-blue-700 underline"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
