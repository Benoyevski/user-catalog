import type { UsersResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';

export async function fetchUsers(limit: number, skip: number): Promise<UsersResponse> {
  const res = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}&select=id,firstName,lastName,email,phone,age,gender,image,username,company,address`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function searchUsers(query: string, limit: number, skip: number): Promise<UsersResponse> {
  const res = await fetch(`${BASE_URL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}&select=id,firstName,lastName,email,phone,age,gender,image,username,company,address`);
  if (!res.ok) throw new Error('Failed to search users');
  return res.json();
}
