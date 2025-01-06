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
