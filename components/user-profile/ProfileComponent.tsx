"use client";

import React, { useState } from "react";
import UserInfoCard from "./sections/UserInfoCard";
import UserMetaCard from "./sections/UserMetaCard";

const ProfileComponent = () => {
  // Dummy user data for design
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+123456789",
  };

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = () => { /* dummy */ };

  return (
    <>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Profile
      </h3>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 space-y-6">
        <UserMetaCard user={user} onEdit={handleEdit} />
        <UserInfoCard user={user} onEdit={handleEdit} />
      </div>
    </>
  );
}

export default ProfileComponent;