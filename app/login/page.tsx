"use client";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
 const supabase = createClientComponentClient();
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, [supabase.auth]);


  const handleSignup = async () => {
   const {data} =  await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}` },
    });
    setUser(data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleSignin = async () => {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setEmail("");
    setPassword("");
    setLoading(false);
    setUser(null);
  };

 console.log({loading , user});
 
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (user) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h2>You are already logged in</h2>
        <p className="text-yellow-500">
          <Link href="/">Go to home page</Link>
        </p>
        <button onClick={handleLogout} className="text-emerald-700">Logout</button>
      </div>
    );
  }

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-2/6 bg-slate-200 shadow-md p-5">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="mb-4 w-full rounded-md p-2 border border-slate-500 bg-slate-100"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          className="mb-4 w-full rounded-md p-2 border border-slate-500 bg-slate-100"
        />
        <button
          onClick={handleSignup}
          className="w-full mb-2 p-2 rounded-md bg-slate-700 text-white hover:bg-slate-500"
        >
          Sign up
        </button>
        <button
          onClick={handleSignin}
          className="w-full mb-2 p-2 rounded-md bg-slate-700 text-white hover:bg-slate-500"
        >
          Sign in
        </button>
      </div>
    </main>
  );
}
