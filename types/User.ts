import { Language } from "./Language";
import { Role } from "./Role";
import { Permission } from "./Permission";

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  status?: string;
  roleId?: number;
  role?: Role;
  languageId?: number;
  language?: Language;
  createdAt?: string;
  updatedAt?: string;
}

/**
* User after logging in (contains their permissions)
*  */
export interface AuthenticatedUser extends Omit<User, "password"> {
  permissions: Permission[];
}