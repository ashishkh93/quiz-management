import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currentDateToUTC = () => {
  return moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
};
