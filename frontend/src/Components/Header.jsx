import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { PenSquare, User } from "lucide-react";

const navItems = [
  { label: "Explore", to: "/home" },
  { label: "Write", to: "/add" },
];

const Header = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("/api/me", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to={user ? "/home" : "/"} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-sm font-semibold tracking-[0.2em] text-amber-900">
            DN
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-950">DevNotex</p>
            <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Minimal publishing</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {user &&
            navItems.map((item) => {
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
        </div>

        {!user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/signup"
              className="hidden text-sm font-medium text-slate-600 transition hover:text-slate-950 sm:inline-flex"
            >
              Create account
            </Link>
            <Link
              to="/"
              className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/add"
              className="hidden items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 sm:inline-flex"
            >
              <PenSquare size={16} />
              <span>New story</span>
            </Link>

            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
            >
              <User size={16} />
              <span className="hidden sm:inline">{user.username}</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
