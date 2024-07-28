import { adminAppName, appUrl, AuthBtn } from "@/auf_next";

export const metadata = {
  title: "Auth for modern applications | Auf",
};

export default async function Home() {
  return (
    <main className="px-6 md:px-0">
      <div className="mt-12 mx-auto">
        <h1 className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-20 text-zinc-800 font-semibold">
          Auth for modern
          <span className="block"> applications</span>
        </h1>
      </div>
      <div className="mt-12 mx-auto">
        <p className="text-center text-xl md:text-2xl">
          Customer identity and access management
          <span className="block">in a few lines of code.</span>
        </p>
      </div>
      <div className="flex items-center md:justify-center flex-col md:flex-row mt-14 md:space-x-5 space-y-5 md:space-y-0">
        <a className="btn-black shrink-0" href="mailto:admin@mail.casply.com">
          Talk to us
        </a>

        <AuthBtn
          redirectUrl={`${appUrl}/dashboard`}
          appName={adminAppName}
          SignInComponent={
            <div className="btn-gray shrink-0">Start for free</div>
          }
          SignOutComponent={<div className="btn block">Sign Out</div>}
        />
      </div>
    </main>
  );
}
