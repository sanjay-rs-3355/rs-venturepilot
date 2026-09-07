import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../services/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      const userDoc = await getDoc(
        doc(db, "users", user.uid)
      );

      if (!userDoc.exists()) {
        await signOut(auth);
        setError("Your account exists, but its VenturePilot profile is missing. Please register again or contact an administrator.");
        return;
      }

      const userData = userDoc.data();

      if (userData.status === "pending_approval" && userData.requestedRole !== "student") {
        await signOut(auth);
        setError(`Your ${userData.requestedRole} account is waiting for administrator approval.`);
        return;
      }

      switch (userData.role) {
        case "student":
          navigate("/dashboard");
          break;

        case "mentor":
          navigate("/mentor");
          break;

        case "coordinator":
        case "incubator":
          navigate("/coordinator");
          break;

        case "vendor":
        case "partner":
          navigate("/vendor");
          break;

        case "admin":
          navigate("/admin");
          break;

        default:
          await signOut(auth);
          setError("This account has no supported VenturePilot role.");
      }
    } catch (error) {
      const messages = {
        "auth/invalid-credential": "Email or password is incorrect.",
        "auth/user-not-found": "No account was found for this email.",
        "auth/wrong-password": "Email or password is incorrect.",
        "auth/too-many-requests": "Too many attempts. Try again in a few minutes.",
      };
      setError(messages[error.code] || "We could not sign you in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] bg-[linear-gradient(rgba(16,42,67,.028)_1px,transparent_1px),linear-gradient(90deg,rgba(16,42,67,.022)_1px,transparent_1px)] bg-[size:28px_28px] px-5 py-8 text-[#102a43] sm:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[28px] bg-[#fffdf9] shadow-[0_24px_80px_rgba(18,52,77,0.14)] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-[#176b87] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#7bdff2]/40" />
          <div className="absolute -right-10 top-0 h-44 w-44 rounded-full border border-[#7bdff2]/30" />
          <div>
            <div className="mb-14 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#7bdff2] text-sm font-black text-[#12344d]">VP</span>
              <div>
                <strong className="block font-serif text-xl">VenturePilot</strong>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#b8d6c5]">build what matters</span>
              </div>
            </div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#7bdff2]">Your idea starts here</p>
            <h2 className="max-w-sm font-serif text-5xl leading-[0.98] tracking-[-0.04em] xl:text-6xl">Make the rough idea <em className="text-[#f6c85f]">sharper.</em></h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-[#d2e4eb]">VenturePilot helps you turn an early spark into a clearer, evidence-backed startup concept.</p>
          </div>
          <div className="border-l-2 border-[#ef8354] pl-4 font-serif text-lg italic text-[#e7f3f7]">“Interesting is a start. Let’s make it specific.”</div>
        </aside>

      <form
        onSubmit={handleLogin}
        className="flex w-full flex-col justify-center px-7 py-10 sm:px-14 lg:px-16 xl:px-24"
      >
        <div className="mb-9">
          <div className="mb-5 flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#176b87] text-xs font-black text-[#7bdff2]">VP</span>
            <strong className="font-serif text-xl text-[#102a43]">VenturePilot</strong>
          </div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#176b87]">Welcome back</p>
          <h1 className="font-serif text-4xl leading-none tracking-[-0.04em] text-[#102a43] sm:text-5xl">Continue building.</h1>
          <p className="mt-4 text-sm leading-6 text-[#627d98]">Sign in to pick up your next startup question.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#e8f2f3] px-3 py-1.5 text-[11px] font-bold text-[#176b87]">Explore</span>
            <span className="rounded-full bg-[#fff1d7] px-3 py-1.5 text-[11px] font-bold text-[#9b6415]">Refine</span>
            <span className="rounded-full bg-[#fff0eb] px-3 py-1.5 text-[11px] font-bold text-[#ad4b31]">Validate</span>
          </div>
        </div>

        {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-700">{error}</p>}

        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#52645d]">Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[#d9e2ec] bg-[#fbfaf6] px-4 py-3.5 text-[#102a43] outline-none transition placeholder:text-[#829ab0] focus:border-[#176b87] focus:bg-white focus:ring-4 focus:ring-[#176b87]/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#52645d]">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#d9e2ec] bg-[#fbfaf6] px-4 py-3.5 text-[#102a43] outline-none transition placeholder:text-[#829ab0] focus:border-[#176b87] focus:bg-white focus:ring-4 focus:ring-[#176b87]/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-[#176b87] px-4 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(23,107,135,0.2)] transition hover:-translate-y-0.5 hover:bg-[#12566d] disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in to VenturePilot →"}
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-[#627d98]">
          New to VenturePilot?{" "}
          <Link
            to="/register"
            className="font-bold text-[#176b87] underline decoration-[#ef8354] decoration-2 underline-offset-4 hover:text-[#12566d]"
          >
            Create an account
          </Link>
        </p>
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#f0dfb9] bg-[#fff8e9] px-4 py-3 text-left">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f6c85f] text-sm text-[#7d5517]">✦</span>
          <p className="text-xs leading-5 text-[#806b43]">Small questions become stronger startups. Your next useful insight is one sign-in away.</p>
        </div>
      </form>
      </div>
    </div>
  );
}