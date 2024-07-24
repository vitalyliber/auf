# Auf Auth Next

The [Auf](https://auf.casply.com) SDK for Next.js.

This library requires the JWT_SECRET_KEY environment variable.

```dotenv
JWT_SECRET_KEY=xyz
```

It can be generated using the code below:

```bash
openssl rand -base64 32
```

Create a route.js file.

```js
// app/api/auf/route.js

import { fetchToken } from "auf-next";
import { NextResponse } from "next/server";

export async function GET(request) {
  const redirectUrl = await fetchToken(request)
  return NextResponse.redirect(redirectUrl);
}
```

Register the app on the Auf dashboard.

Use the registered appName in an AuthBtn component.

```jsx
import { AuthBtn } from "auf-next";

<AuthBtn
  redirectUrl={
    process.env.NODE_ENV === "production"
      ? "https://my-site.com"
      : "http://localhost:3000"
  }
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
