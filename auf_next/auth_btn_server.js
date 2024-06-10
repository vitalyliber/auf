import AuthBtnClient from "./auth_btn_client";
import { Suspense } from "react";

export default async function AuthBtnServer(props) {

  return (
    <Suspense>
      <AuthBtnClient {...props} />
    </Suspense>
  );
}
