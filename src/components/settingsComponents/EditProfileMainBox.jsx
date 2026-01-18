import React from 'react'
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Image, User2 } from 'lucide-react';
import BackButton from '../BackButton.jsx'
const Section = ({ title, children }) => (
  <div className="mb-2">
    <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">
      {title}
    </h2>
    <div className="bg-white rounded-xl divide-y border border-gray-200">
      {children}
    </div>
  </div>
);

const Item = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-4 py-4 active:bg-gray-50 transition cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-gray-500" />
      <span className="text-sm text-gray-800">{label}</span>
    </div>
    <ChevronRight size={18} className="text-gray-400" />
  </button>
);

const EditProfileMainBox = () => {

    const {openUserProfile} = useClerk();
    const navigate = useNavigate();

  return (
    <div className='mx-auto max-w-md py-24 min-h-screen bg-white px-4 space-y-2'>

      <BackButton />

      <Section title="Profile Details">
        <Item
          icon={Image}
          label="Change Profile Image"
          onClick={openUserProfile}
        />
      </Section>

      <Section>
         <Item
          icon={User2}
          label="Edit Details"
          onClick={() => navigate("/setting/open-change-profile-details")}
        />
      </Section>
    </div>
  )
}

export default EditProfileMainBox
