'use server';

import { cookies } from 'next/headers';

export const setCookie = async (name: string, value: string) => {
  await cookies().set(name, value, { secure: true });
};
