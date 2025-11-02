export const PERMISSIONS = {
  // Users
  VIEW_USERS: "view-users",
  ADD_USER: "add-user",
  EDIT_USER: "edit-user",
  DELETE_USER: "delete-user",

  // Roles & Permissions
  VIEW_ROLES: "view-roles",
  ADD_ROLE: "add-role",
  EDIT_ROLE: "edit-role",
  DELETE_ROLE: "delete-role",

  VIEW_PERMISSIONS: "view-permissions",
  ADD_PERMISSION: "add-permission",
  EDIT_PERMISSION: "edit-permission",
  DELETE_PERMISSION: "delete-permission",

  // Products
  VIEW_PRODUCTS: "view-products",
  ADD_PRODUCT: "add-product",
  EDIT_PRODUCT: "edit-product",
  DELETE_PRODUCT: "delete-product",

  // Product Categories
  VIEW_CATEGORIES: "view-categories",
  ADD_CATEGORY: "add-category",
  EDIT_CATEGORY: "edit-category",
  DELETE_CATEGORY: "delete-category",

  // Dashboard
  VIEW_DASHBOARD: "view-dashboard",

  // Profile
  VIEW_PROFILE: "view-profile",
  EDIT_PROFILE: "edit-profile",
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;
export type PermissionValue = typeof PERMISSIONS[PermissionKey];
