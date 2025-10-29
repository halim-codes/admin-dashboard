"use client";
import Image from "next/image";

const AuthSection = () => {

  return (
    <div className="flex flex-col items-center max-w-xs">
      <Image
        width={400}
        height={40}
        src="/logo.png"
        alt="Logo"
      />
      <p className="text-center text-xlg text-gray-400 dark:text-white/80">
        {/* {messages["register_sentence"] || "Create Quotes Fast. Close Deals Faster."} */}
        {/* Create Quotes Fast. Close Deals Faster. */}
      </p>
    </div>
  );
}

export default AuthSection;