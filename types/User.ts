import { Language } from "./Language";
import { Role } from "./Role";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  status?: string;
  roleId?: number;
  role?: Role;
  languageId?: number;
  language?: Language;
  createdAt?: string;
  updatedAt?: string;
}
