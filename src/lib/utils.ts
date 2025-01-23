import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export type ObjectKeys<T extends Record<PropertyKey, unknown>> = `${Exclude<
  keyof T,
  symbol
>}`;

export const objectEntries = <Type extends Record<PropertyKey, unknown>>(
  obj: Type
): Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]> => {
  return Object.entries(obj) as Array<
    [ObjectKeys<Type>, Type[ObjectKeys<Type>]]
  >;
};

/**
 * ISO 8601 -> YYYY.MM.DD HH:mm:ss
 */
export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};
