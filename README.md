# Next.js Project Starterpack

This project is built with [Next.js](https://nextjs.org/), leveraging the power of TypeScript, Zod for schema validation, Shadcn UI for styling, Prisma as the ORM, and Lucia Auth v3 for authentication.

## Table of Contents

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
- [Database Design](#database-design)
- [Scripts](#scripts)
- [Authentication System using Lucia and Prisma](#authentication-system-using-lucia-and-prisma)
  - [Initialization](#initialization)
  - [TypeScript Declarations](#typescript-declarations)
  - [Session Validation](#session-validation)
- [React Session Context with Lucia Auth](#react-session-context-with-lucia-auth)
- [Code Structure](#code-structure)
  - [SessionProvider Component](#sessionprovider-component)
  - [useSession Hook](#usesession-hook)
- [Usage](#usage)
  - [Example](#example)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

<!-- TOC end -->

<!-- TOC --><a name="getting-started"></a>

## Getting Started

To get a local copy up and running, follow these simple steps.

<!-- TOC --><a name="prerequisites"></a>

### Prerequisites

- [Node.js v20](https://nodejs.org/en/download/)

<!-- TOC --><a name="installation"></a>

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/KuraoHikari/nextjs-15-ts-prisma-lucia-shadcn.git
   ```

2. Install dependencies:

   ```bash
   npm i --legacy-peer-deps
   ```

3. Set up the environment variables as per the [Environment Variables](#environment-variables) section.

4. Start the development server:

   ```bash
   npm run dev
   ```

<!-- TOC --><a name="technologies-used"></a>

## Technologies Used

- **Next.js**: A React framework for production.
- **TypeScript**: Static type checking for JavaScript.
- **Zod**: Type-safe schema validation.
- **Shadcn UI**: A customizable component library.
- **Prisma**: A modern database toolkit.
- **Lucia Auth v3**: A flexible and secure authentication system.

<!-- TOC --><a name="project-structure"></a>

## Project Structure

The project structure follows the standard Next.js setup with some additions:

```
/prisma
/public
/src
  /app           - App components
  /assets        -
  /components    - Reusable components
  /lib           - Utility functions and configurations
  /prisma        - Prisma schema and migrations
auth.ts          - Lucia Auth setup and configurations
```

<!-- TOC --><a name="environment-variables"></a>

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NO_SSL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""
```

Ensure to replace the placeholder values with your actual credentials.

<!-- TOC --><a name="setup-instructions"></a>

## Setup Instructions

1. **Database Setup**:

   Run Prisma migrations to set up your database schema:

   ```bash
   npx prisma migrate dev
   ```

2. **Zod Validation**:

   Utilize Zod for validating schemas throughout the project. Example usage can be found in the `/lib` directory.

3. **Shadcn UI**:

   Customize and extend UI components from Shadcn UI in the `/components` directory.

4. **Lucia Auth Setup**:

   Configure Lucia Auth in the `auth.ts` directory for handling authentication. Follow the [Lucia Auth documentation](https://lucia-auth.com/) for more details.

<!-- TOC --><a name="database-design"></a>

## Database Design

To get a better understanding of the database structure, you can view the Entity Relationship Diagram (ERD) :

[View ERD](https://imgur.com/QforZ07.png)

For a direct look at the main ERD, see below:

![ERD Warung Bu Ode](https://imgur.com/QforZ07.png)

<!-- TOC --><a name="scripts"></a>

## Scripts

- `npm run  dev`: Run the development server.
- `npm run start`: Start the production server.

<!-- TOC --><a name="authentication-system-using-lucia-and-prisma"></a>

## Authentication System using Lucia and Prisma

The following code is used to integrate Lucia Auth with Prisma in a Next.js project.

<!-- TOC --><a name="initialization"></a>

### Initialization

```typescript
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import prisma from "./lib/prisma";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      username: databaseUserAttributes.username,
      displayName: databaseUserAttributes.displayName,
      avatarUrl: databaseUserAttributes.avatarUrl,
      googleId: databaseUserAttributes.googleId,
    };
  },
});
```

1. **Lucia Initialization**: Configures Lucia authentication with Prisma as the adapter.
2. **Session Cookie Configuration**: Sets session cookies with secure attributes based on the environment.
3. **User Attribute Mapping**: Maps database user attributes to the application user object.

<!-- TOC --><a name="typescript-declarations"></a>

### TypeScript Declarations

```typescript
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  googleId: string | null;
}
```

1. **Lucia TypeScript Declarations**: Extends Lucia with the application's configuration and database user attributes.

<!-- TOC --><a name="session-validation"></a>

### Session Validation

```typescript
export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}

    return result;
  },
);
```

1. **validateRequest Function**: Validates the session ID from cookies and manages session cookies accordingly.
2. **Session Management**: Refreshes or clears session cookies based on the session validation result.

<!-- TOC --><a name="react-session-context-with-lucia-auth"></a>

## React Session Context with Lucia Auth

This component structure includes a `SessionProvider` and a `useSession` hook to manage and access user session data within the application.

<!-- TOC --><a name="code-structure"></a>

## Code Structure

<!-- TOC --><a name="sessionprovider-component"></a>

### SessionProvider Component

```typescript
"use client";

import { Session, User } from "lucia";
import React, { createContext, useContext } from "react";

interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
```

- **SessionProvider**: A React context provider that makes the session data available to the entire application.
- **SessionContext**: The context that holds the session and user data.
- **SessionContext.Provider**: Wraps the application components and provides access to session data.

<!-- TOC --><a name="usesession-hook"></a>

### useSession Hook

```typescript
export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
```

- **useSession**: A custom hook that allows components to access the session data. It ensures that the hook is only used within the `SessionProvider`.

<!-- TOC --><a name="usage"></a>

## Usage

1. **Wrap your Application**: Use `SessionProvider` to wrap your application or specific components where session data is required.

2. **Access Session Data**: Use the `useSession` hook to access session and user information within your components.

<!-- TOC --><a name="example"></a>

### Example

```typescript
import React from "react";
import { SessionProvider, useSession } from "./SessionProvider";

function App() {
  const sessionValue = {
    user: {/* user data */},
    session: {/* session data */}
  };

  return (
    <SessionProvider value={sessionValue}>
      <YourComponent />
    </SessionProvider>
  );
}

function YourComponent() {
  const { user, session } = useSession();

  return <div>{user.username}</div>;
}
```

<!-- TOC --><a name="deployment"></a>

## Deployment

Follow the Next.js deployment documentation [here](https://nextjs.org/docs/deployment) for deploying your application.

<!-- TOC --><a name="contributing"></a>

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

<!-- TOC --><a name="license"></a>

## License

Distributed under the MIT License. See `LICENSE` for more information.
