"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddUserModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
    onClose();
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[600px] p-8 lg:p-10">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90 text-center">
          Add User
        </h4>

        <div className="space-y-6">
          <div>
            <Label className="text-md text-gray-800 dark:text-white/90">Name</Label>
            <InputField
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter name"
              className="placeholder:text-gray-800 dark:placeholder:text-white/90"
            />
          </div>

          <div>
            <Label className="text-md text-gray-800 dark:text-white/90">Email</Label>
            <InputField
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email"
              className="placeholder:text-gray-800 dark:placeholder:text-white/90"
            />
          </div>

          <div>
            <Label className="text-md text-gray-800 dark:text-white/90">Phone</Label>
            <InputField
              type="text"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter phone number"
              className="placeholder:text-gray-800 dark:placeholder:text-white/90"
            />
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            size="sm"
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white shadow-sm transition-all duration-200 rounded-md focus:ring-2 focus:ring-primary-300"
          >
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
