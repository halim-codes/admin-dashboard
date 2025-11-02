"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { useRoles } from "@/hooks/useRoles";
import { useLanguages } from "@/hooks/useLanguages";
import { User } from "@/types/User";
import { useUpdateUser } from "@/hooks/useUsers";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User;
}

const EditUserModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, user }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    roleId: undefined as number | undefined,
    languageId: undefined as number | undefined,
    status: "active" as "active" | "inactive",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { roles = [], isLoading: rolesLoading } = useRoles();
  const { languages = [], isLoading: langsLoading } = useLanguages();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (!isOpen) {
      setMessage(null);
    }
  }, [isOpen]);

  // --- Initialize form when user or roles/languages load ---
  useEffect(() => {
    if (user && !rolesLoading && !langsLoading) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        roleId: user.role?.id || user.roleId,
        languageId: user.language?.id || user.languageId,
        status: user.status === "active" || user.status === "inactive" ? user.status : "active",
      });
      setMessage(null);
    }
  }, [user, rolesLoading, langsLoading]);

  const handleChange = (field: string, value: string | number) => {
    if (field === "roleId" || field === "languageId") {
      setForm({ ...form, [field]: parseInt(value as string) });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.id) return;

    setLoading(true);

    try {
      await updateUser.mutateAsync({ id: user.id, data: form });
      setMessage("User updated successfully!");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      onClose();
      onSuccess();

      setForm({
        username: "",
        email: "",
        roleId: undefined,
        languageId: undefined,
        status: "active",
      });
    } catch (err) {
      console.error(err);
      setMessage("Error saving user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[600px] p-8 lg:p-10 mx-4 sm:mx-auto"
    >
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90 text-center">
          Edit User
        </h4>

        {message && (
          <p
            className={`mb-4 text-center font-medium ${message.includes("Error") ? "text-red-600" : "text-green-600"
              }`}
          >
            {message}
          </p>
        )}

        <div className="space-y-6">
          {/* Username & Email */}
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

          {/* Role & Language */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label>Role</Label>
              <Select
                value={form.roleId?.toString() || ""}
                onChange={(value) => handleChange("roleId", value)}
                options={roles.map((r) => ({
                  value: String(r.id),
                  label: r.name,
                }))}
                placeholder={rolesLoading ? "Loading roles..." : "Select Role"}
                disabled={rolesLoading}
                required
              />
            </div>

            <div className="flex-1">
              <Label>Language</Label>
              <Select
                value={form.languageId?.toString() || ""}
                onChange={(value) => handleChange("languageId", value)}
                options={languages.map((l) => ({
                  value: String(l.id),
                  label: l.name,
                }))}
                placeholder={langsLoading ? "Loading languages..." : "Select Language"}
                disabled={langsLoading}
                required
              />
            </div>
          </div>

          {/*  Status */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label>Status</Label>
              <Select
                value={form.status}
                onChange={(value) => handleChange("status", value)}
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
                placeholder="Select Status"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-8">
          <Button size="sm" variant="outline" onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button size="sm" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
