import { useState } from "react";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestedRole, setRequestedRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email: email.toLowerCase(),
        role: "student",
        requestedRole,
        status: requestedRole === "student" ? "active" : "pending_approval",
        createdAt: Timestamp.now(),
      });

      setSuccess(requestedRole === "student"
        ? "Student account created successfully. You can now log in."
        : `Your ${requestedRole} registration was submitted for administrator approval.`);
      setPassword("");
    } catch (error) {
      if (error.code === "permission-denied") {
        if (auth.currentUser) await deleteUser(auth.currentUser).catch(() => {});
        setError("Your account could not finish setup because Firestore permissions are blocking the profile write. Publish the included firestore.rules file, then try again.");
      } else if (error.code === "auth/email-already-in-use") {
        setError("An account already exists for this email. Try logging in instead.");
      } else {
        setError(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleRegister}
        className="bg-slate-900 p-8 rounded-xl w-96"
      >
        <h1 className="text-3xl text-white font-bold mb-6">
          Register
        </h1>

        {error && <p className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">{error}</p>}
        {success && <p className="mb-4 rounded bg-green-100 p-3 text-sm text-green-700">{success}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded bg-white text-slate-900 placeholder:text-slate-500 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-medium text-slate-200">I am registering as</span>
            <select
              value={requestedRole}
              onChange={(e) => setRequestedRole(e.target.value)}
              className="w-full rounded bg-white p-3 text-slate-900 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student founder</option>
              <option value="mentor">Mentor</option>
              <option value="incubator">Incubator / program partner</option>
            </select>
            {requestedRole !== "student" && <span className="mt-2 block text-xs text-slate-400">Mentor and incubator access requires administrator approval.</span>}
          </label>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-white text-slate-900 placeholder:text-slate-500 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-white text-slate-900 placeholder:text-slate-500 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded disabled:opacity-60"
          type="submit"
          disabled={saving}
        >
          {saving ? "Creating account..." : "Create Student Account"}
        </button>
      </form>
    </div>
  );
}