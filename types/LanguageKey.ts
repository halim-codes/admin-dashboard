import { Language } from "./Language";

export interface LanguageKeyLinks {
  self: string;
  edit: string;
  delete: string;
}

export interface LanguageKey {
  id: number;
  keyName: string;
  value: string;
  languageId?: number;
  language?: Language;
  contextId?: number;
  createdAt: string;
  updatedAt: string;
  _links?: LanguageKeyLinks;
}
