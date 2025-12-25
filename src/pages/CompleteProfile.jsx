import React, { useState } from "react";
import { useContextUser } from "../context/UserContext";
import { useAuth, useUser as useClerkUser } from "@clerk/clerk-react";
import { Calendar, LucidePhone, Mail, MapPin, MapPinned, Store, User } from "lucide-react";

const CompleteProfile = () => {
  const { user, setUser, backendUrl } = useContextUser();
  const { getToken } = useAuth();
  const { user: clerkUser } = useClerkUser();

  // Making States
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState("");
  const [shop, setShop] = useState("");
  const [village, setVillage] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");

  const [loading, setLoading] = useState(false);

  // Making Submit Function Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Enter Valide 10 Digit Mobile Number");
      return;
    }

    try {
      setLoading(true);

      const parts = name.trim().split(/\s+/);

      /* 1️⃣ Update name in Clerk */
      await clerkUser.update({
        firstName: parts[0],
        lastName: parts.length > 1 ? parts.slice(1).join(" ") : " ",
      });

      /* 2️⃣ Update profile in backend */
      const token = await getToken();

      const res = await fetch(`${backendUrl}/api/users/complete-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone, name , shop , village , address , birthday }),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full top-0 left-0 z-100">
      <div className="p-6 md:px-16 lg:px-24 xl:px-32 w-full bg-black">
        
        <h3 className="text-white text-3xl font-semibold text-center mx-auto mt-5">
          Complete Profile
        </h3>
        <p className="text-slate-300 text-center mt-3 max-w-md mx-auto text-[13px]">
          Complete Your Profile For Fast & Batter Experience
        </p>

        {/* Form Start for getting data */}
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-10 w-full">
          <div>
            <label htmlFor="name" className="mb-2 font-medium">
              Full Name
            </label>
            <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-blue-500 mt-1">
              <User size={20}/>
              <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 bg-transparent outline-none"
            />
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="email" className="mb-2 font-medium">
              Email
            </label>
           <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-blue-500 mt-1">
            <Mail size={20}/>
             <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              disabled
              className="w-full p-3 bg-transparent outline-none"
            />
           </div>
          </div>

          <div className="mt-2">
            <label htmlFor="phone" className="mb-2 font-medium">
              Mobile No.
            </label>
            <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-blue-500 mt-1">
              <LucidePhone size={20}/>
              <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              required
              maxLength={10}
              placeholder="0123456789"
              className="w-full p-3 bg-transparent outline-none"
            />
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="shop" className="mb-2 font-medium">
              Shop Name
            </label>
           <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-blue-500 mt-1">
            <Store size={20}/>
             <input
              type="text"
              id="shop"
              name="shop"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              placeholder="Sanjeet Water Supplier"
              className="w-full p-3 bg-transparent outline-none"
            />
           </div>
          </div>

          <div className="mt-2">
            <label htmlFor="village" className="mb-2 font-medium">
              Village/City
            </label>
            <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-blue-500 mt-1">
              <MapPinned size={20}/>
              <input
              type="text"
              id="village"
              name="village"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              required
              placeholder="Sanjeet"
              className="w-full p-3 bg-transparent outline-none"
            />
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="address" className="mb-2 font-medium">
              Proper Address
            </label>
           <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-blue-500 mt-1">
            <MapPin size={20}/>
             <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Main Road Sadar Bajar Sanjeet"
              className="w-full p-3 bg-transparent outline-none"
            />
           </div>
          </div>

          <div className="mt-2">
            <label htmlFor="birth" className="mb-2 font-medium">
              BirthDay
            </label>
            <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-slate-700 focus-within:border-blue-500 mt-1">
              <Calendar size={20}/>
              <input
              type="date"
              id="birth"
              name="birth"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className=" w-full p-3 bg-transparent outline-none"
            />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full mt-6"
          >
            {loading ? "Saving..." : "Submit & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
