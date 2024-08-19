import { array, z } from "zod";
import { MutableRefObject } from "react";
const schema = z.object({
  email: z
    .string()
    .min(1, "cant be empty")
    .min(8, "Invalid email format")
    .email("Invalid email"),

  password: z
    .string()
    .min(1, "cant be empty")
    .min(3, " passs must be more than 8 charaters"),
  serverError: z.string().optional(),
});

const schemaCreate = z
  .object({
    serverError: z.string().optional(),

    email: z
      .string()
      .min(1, "cant be empty")
      .min(8, "Invalid email format")
      .email("Invalid email"),

    password: z
      .string()
      .min(1, "cant be empty")
      .min(8, " passs must be more than 8 charaters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
export interface MyLinkform {
  Num: number;
  pToServer: MutableRefObject<boolean>;
  sendDataToParent: (arg1: string, arg2: string) => void;
  linkGenre?: string;
  linkUrl?: string;
}
export interface Link {
  id?: number;
  type: string;
  url: string;
  authorId?: string;
  clientId: string;
  isEmpty: boolean;
  isValidURL: boolean;
}
export interface LinkInitialData {
  id: number;
  type: string;
  url: string;
  authorId: string;
  clientId?: string;
}

export type formData = {
  email: string;
  password: string;
};
export interface Option {
  value: string;
}
export type ImageTypeMap = {
  [key: string]: string;
};
export type nameEmailTypeMap = {
  [key: string]: string;
};
export type ShareTypeMap = {
  firstName: string;
  lastName: string;
  email: string;
  imageurl: string;
  userLinks: [];
};
export interface NameEmailTypeMap {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  imageurl: string;
  firstNameError?: boolean;
  lastNameError?: boolean;
}
export interface ReqContextType {
  callData: boolean;
  validateData: () => void;
}

export { schema, schemaCreate };
