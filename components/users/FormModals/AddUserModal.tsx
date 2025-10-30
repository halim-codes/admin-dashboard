"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { useRoles } from "@/hooks/useRoles";
import { useLanguages } from "@/hooks/useLanguages";
import { useCreateUser } from "@/hooks/useUsers";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddUserModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const { roles = [] } = useRoles();
  const { languages = [] } = useLanguages();
  const createUser = useCreateUser();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    roleId: undefined as number | undefined,
    languageId: undefined as number | undefined,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setMessage(null);
    }
  }, [isOpen]);

  const handleChange = (field: string, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      roleId: form.roleId,
      languageId: form.languageId,
    };

    try {
      await createUser.mutateAsync(payload);

      setMessage("User created successfully!");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSuccess();
      onClose();

      setForm({
        username: "",
        email: "",
        password: "",
        roleId: undefined,
        languageId: undefined,
      });
    } catch (err) {
      console.error(err);
      setMessage("Error creating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}   className="w-full max-w-[600px] p-8 lg:p-10 mx-4 sm:mx-auto">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90 text-center">
          Add User
        </h4>

        {message && (
          <p
            className={`mb-4 text-center font-medium ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label>Username</Label>
              <InputField
                type="text"
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="flex-1">
              <Label>Email</Label>
              <InputField
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label>Password</Label>
              <InputField
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="flex-1">
              <Label>Role</Label>
              <Select
                value={form.roleId?.toString() || ""}
                onChange={(value) => handleChange("roleId", parseInt(value))}
                options={roles.map((role) => ({ value: role.id.toString(), label: role.name }))}
                placeholder="Select Role"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label>Language</Label>
              <Select
                value={form.languageId?.toString() || ""}
                onChange={(value) => handleChange("languageId", parseInt(value))}
                options={languages.map((lang) => ({ value: lang.id.toString(), label: lang.name }))}
                placeholder="Select Language"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button size="sm" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
