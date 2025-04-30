import { compare, hash } from "bcryptjs";
import { prisma } from "./database.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRETS],
    sameSite: "lax",
    maxAge: 30* 25 *60 *60,
    httpOnly: true
  }
});

async function createUserSession(userId, redirctPAth) {
  // behind the seend, remix generates such a cookie for us
  const session = await sessionStorage.getSession();
  // store the user id inside this cookie
  session.set('userId', userId);
  // we must send then this cookie to the user, we must make a response 
  return redirect(redirctPAth, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session)
    }
  });
}

// We can access the cookie just in the backend
export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");
  if(!userId)
    return  null;
  return userId;
}

export async function distroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  });
}

export async function requireSession(request) {
  const userId = await getUserFromSession(request);
  if(!userId){
    // to stop all other processes like fetching data
    throw redirect("/auth");
  }
  return userId;
}

export async function signup(email: string, password: string) {
  try {
    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      throw {message: "There is already a user with this email"};
    }

    const passwordHashed = await hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: passwordHashed,
      },
    });
    return await createUserSession(newUser.id, "/expenses");
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export async function login(email, password) {
  try {
    const existUser = await prisma.user.findFirst({ where: { email } });
    if(!existUser){
      throw {message: "There is no user with this email, try again"};
    }

    const correctPassword = await compare(password, existUser.password);
    if(!correctPassword){
      throw {message: "incorrect password for this user"};
    }
    return createUserSession(existUser.id, "/expenses");
  } catch (error) {
    console.log(error);
    throw error;
  }
}