import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://devnotex.onrender.com/api/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400 tracking-wide">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <h2 className="text-lg sm:text-xl font-semibold text-black mb-2">
          Please login to view your profile
        </h2>
        <p className="text-gray-500 text-sm">
          You need to be authenticated
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <div className="flex items-center justify-center px-4 sm:px-6 
                      pt-24 sm:pt-28 md:pt-32 pb-16 mt-48 lg:mt-28 sm:mt-28 md:mt-32">
        <div className="w-full max-w-sm sm:max-w-md bg-white 
                        border border-gray-200 rounded-2xl 
                        shadow-sm p-6 sm:p-8">

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full 
                            border-2 border-black flex items-center 
                            justify-center text-2xl sm:text-3xl 
                            font-bold text-black">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl 
                           font-semibold tracking-wide text-black">
              {user.username}
            </h2>

            <p className="text-xs uppercase tracking-widest 
                          text-gray-400 mt-1">
              Developer
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-5 sm:mb-6"></div>

          {/* Profile Info */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider 
                               text-gray-500">
                Username
              </span>
              <span className="text-sm font-medium text-black">
                {user.username}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider 
                               text-gray-500">
                Email
              </span>
              <span className="text-sm font-medium text-black 
                               break-all">
                {user.email}
              </span>
            </div>
          </div>

         
        </div>
      </div>

    </div>
  );
}
