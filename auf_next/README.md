# Auf Auth Next

The Auf SDK for Next.js.

This library requires the JWT_SECRET_KEY environment variable.

```dotenv
JWT_SECRET_KEY=xyz
```

It can be generated using the code below:

```bash
openssl rand -base64 32
```

```jsx
import { AuthBtnServer } from "auf-next";

<AuthBtnServer
  redirectUrl={`https://my-site.com/dashboard`}
  appName="my-site"
  SignInComponent={
    <div className="btn">Sign in</div>
  }
  SignOutComponent={
    <div className="btn">Sign Out</div>
  }
/>
```

```jsx
import { fetchCurrentUser } from "auf_next";

export default async function ShowCurrentUser() {
  const currentUser = await fetchCurrentUser();

  return <div>
    <p>User ID: {currentUser.id}</p>
    <p>Email: {currentUser.email}</p>
    <p>Device ID: {currentUser.deviceId}</p>
    <p>App ID: {currentUser.appId}</p>
    <p>Roles: {currentUser.roles}</p>
  </div>
}
```
