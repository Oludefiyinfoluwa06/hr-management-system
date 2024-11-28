'use server';

import { cookies } from 'next/headers';

export const setCookie = async (name: string, value: string) => {
  await cookies().set(name, value, { secure: true });
};

export const getCookie = async (name: string) => {
  return await cookies().get(name);
}

export const deleteCookie = async (name: string) => {
  await cookies().delete(name);
}
