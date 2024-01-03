import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col justify-center items-center">
        <p>
          <Link href="/login">
            You are not logged in.
            <span className="font-semibold text-emerald-500">
              Click here to go to the login page
            </span>
          </Link>
        </p>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <h2 className="font-bold ">Home Page</h2>
      <h4 className="font-light text-stone-600">
        You are logged in so you can see this page
      </h4>
      <p className="text-red-700">
        <Link href="/login">Go to login page</Link>
      </p>
    </main>
  );
}
