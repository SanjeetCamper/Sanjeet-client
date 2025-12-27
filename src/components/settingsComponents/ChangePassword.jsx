import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { Lock } from "lucide-react";

const ChangePassword = () => {
  const { openUserProfile } = useClerk();
//   const passwordChange = openUserProfile.security();

  return (
    <div className="mx-auto max-w-md py-27 min-h-screen bg-white px-4">
      <h1 className="text-xs font-semibold text-gray-500 mb-4">
        CHANGE PASSWORD
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Lock className="text-gray-500 mt-1" size={20} />
          <div>
            <p className="text-sm text-gray-800 font-medium">
              Manage your password
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Password and security settings are managed securely by Clerk.
            </p>
          </div>
        </div>

        <button
          onClick={() => openUserProfile({tab:"security"})}
          className="mt-4 w-full bg-gradient-to-br from-[#40afff] via-[#06b6d4] to-[#14b8a6] text-white py-3 rounded-xl text-sm font-medium active:scale-95 transition"
        >
          Open Security Settings
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
