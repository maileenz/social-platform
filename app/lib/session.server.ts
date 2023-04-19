import {
  createCookieSessionStorage,
  redirect,
  type Session,
} from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_NAME = process.env.SESSION_NAME;
const USER_SESSION_KEY = "userId";

if (!SESSION_SECRET || !SESSION_NAME) {
  throw new Error(
    "Please set the SESSION_SECRET and SESSION_NAME environment variables"
  );
}

const storage = createCookieSessionStorage({
  cookie: {
    name: SESSION_NAME,
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

export async function getSession(request: Request): Promise<Session> {
  return await storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request): Promise<string | undefined> {
  const session = await getSession(request);

  return session.get(USER_SESSION_KEY);
}

export async function setUserId(
  request: Request,
  userId: string,
  returnTo: string = "/feed"
) {
  const session = await getSession(request);

  session.set(USER_SESSION_KEY, userId);

  return redirect(returnTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
