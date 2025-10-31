"use client";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { usePermissions } from "@/hooks/usePermissions";

const PermissionsComponent = () => {
  const { permissions = [], isLoading } = usePermissions();

  if (isLoading) {
    return <p>Loading permissions...</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5 lg:mb-7">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Permissions
        </h3>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Endpoint
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {permissions.length > 0 ? (
                  permissions.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-lg dark:text-gray-100">
                        {permission.name}
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-lg dark:text-gray-100">
                        {permission.endpoint}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <td
                      colSpan={2}
                      className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      No permissions found.
                    </td>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PermissionsComponent;
