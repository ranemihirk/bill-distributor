"use server";

import { client } from "@/lib/connector";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createBook(formData) {
  try {
    const { email, name, password } = Object.fromEntries(formData);
    const userData = {
      id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      name,
      email,
      password,
      bills: JSON.stringify([]),
    };
    const keys = await client.keys("*");
    if (!keys.includes(`users:${userData.email}`)) {
      const result = await client.hSet(`users:${userData.email}`, userData);

      return { message: { status: "success", data: userData } };
    } else {
      return { error: "User with email already exists!" };
    }
  } catch (e) {
    return { error: e };
  }
}

export async function fetchBook(email) {
  try {
    const result = await client.hGetAll(`users:${email}`);
    if (!result || Object.keys(result).length === 0) {
      return { error: "No such user." };
    }
    return { message: { status: "success", data: { ...result } } };
  } catch (e) {
    return { error: e };
  }
}

export async function test() {
  try {
    const keys = await client.keys("*");
    const test = await client.hGetAll(`users:rane204mihir@gmail.com`);
    return { ...test, ...keys };
  } catch (e) {
    return { error: e };
  }
}
