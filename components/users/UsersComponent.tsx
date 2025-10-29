"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { PencilIcon, TrashBinIcon } from "@/icons";
import Button from "@/components/ui/button/Button";
import AddUserModal from "./FormModals/AddUserModal";
import EditUserModal from "./FormModals/EditUserModal";
import DeleteUserModal from "./FormModals/DeleteUserModal";

const UsersComponent = () => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+123456789" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+987654321" },
  ];

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  return (
    <>
      <div className="flex items-center justify-between mb-5 lg:mb-7">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Users
        </h3>
        <div className="flex justify-end mb-4">
          <Button size="sm" onClick={() => setAddModalOpen(true)}>
            Add
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Name
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Email
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Phone
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-lg dark:text-gray-100">
                      {user.name}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-lg dark:text-gray-100">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-lg dark:text-gray-100">
                      {user.phone}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-white">
                      <div className="flex items-center gap-5">
                        <button onClick={() => openEditModal(user)}>
                          <PencilIcon />
                        </button>
                        <button onClick={() => openDeleteModal(user)}>
                          <TrashBinIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={() => { }}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSuccess={() => { }}
        user={selectedUser}
      />

      {/* Delete User Modal */}
      <DeleteUserModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onSuccess={() => { }}
        user={selectedUser}
      />
    </>
  );
};

export default UsersComponent;
