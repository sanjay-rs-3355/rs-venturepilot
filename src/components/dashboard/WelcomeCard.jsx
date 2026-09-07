import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";

export default function WelcomeCard() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

      <h1 className="text-5xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="text-blue-400 text-2xl mt-3 font-semibold">
        {user?.name || "Loading..."}
      </p>

      <p className="text-slate-400 mt-4">
        Ready to build the next unicorn startup?
      </p>

    </div>
  );
}