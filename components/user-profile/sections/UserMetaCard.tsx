"use client";

import React from "react";
import Image from "next/image";
import { PencilIcon } from "@/icons";

type Props = {
  user: {
    name: string;
  };
  onEdit: () => void;
};

const UserMetaCard = ({ user, onEdit }: Props) => {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <Image
              src="/images/user/user-1.png"
              alt="user"
              width={80}
              height={80}
            />
          </div>
          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              {user.name}
            </h4>
          </div>
        </div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:w-auto"
          onClick={onEdit}
        >
          <PencilIcon />
          Edit
        </button>
      </div>
    </div>
  );
}

export default UserMetaCard;