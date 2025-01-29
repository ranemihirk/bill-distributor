"use server";
import { client } from "@/lib/connector";
import { v4 as uuidv4 } from "uuid";

export async function createUser(formData) {
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

export async function fetchUser(email) {
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

export async function testSet() {
  try {
    const userData = {
      id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      name: "Test",
      email: "test@test.com",
      password: "test",
      bills: JSON.stringify([
        {
          id: "528dbacd-b666-41a9-bcff-4b7b1ca7ead9",
          title: "Barista",
          billTotal: 1265.25,
          dated: "2025-01-27T00:00:00.000Z",
          billAmountPaid: 662,
          items: [
            {
              id: "000040d8-184d-4f53-a087-d0dace4c30ef",
              name: "Americano",
              rate: 170,
              quantity: 5,
            },
            {
              id: "65709a98-2f20-4095-96ee-78c63fce90fc",
              name: "Frappe",
              rate: 355,
              quantity: 1,
            },
          ],
          taxes: [
            {
              id: "8199b95e-81e1-4974-abba-df3819953d91",
              taxType: "CGST",
              taxPercentage: 2.5,
            },
            {
              id: "853835ba-0728-4039-8e49-a21a4afe9cbe",
              taxType: "SGST",
              taxPercentage: 2.5,
            },
          ],
          users: [
            {
              id: "34426369-3983-46ab-8d79-f4e04ec4f053",
              name: "Amit",
            },
            {
              id: "db53ef22-0710-4296-be5d-2753e3f8b3e6",
              name: "Mihir",
            },
          ],
          userToItems: [],
          extraFee: [],
        },
      ]),
    };
    // console.log("userData: ", userData);
    const result = await client.hSet(`users:${userData.email}`, userData);
    // console.log("result: ", result);
    return { ...userData };
  } catch (e) {
    return { error: e };
  }
}

export async function fetchUserBills(email) {
  try {
    const result = await client.hGetAll(`users:${email}`);
    if (!result || (Object.keys(result).length === 0 && result.bills)) {
      return { error: "No such user." };
    }
    const bills = JSON.parse(result.bills);
    return { message: { status: "success", data: { ...bills } } };
  } catch (e) {
    return { error: e };
  }
}

export async function setUserBills(user, bills) {
  try {
    const result = await client.hSet(`users:${user.email}`, { bills, ...user });
    return { message: { status: "success", data: { result } } };
  } catch (e) {
    return { error: e };
  }
}

export async function moveDataToRedis(email, bills) {
  try {
    const user = await client.hGetAll(`users:${email}`);
    const redisBills = JSON.parse(user.bills);
    // const allBills = redisBills.concat(bills);
    const mergedBills = [
      ...redisBills,
      ...bills.filter(localBill => 
        !redisBills.some(redisBill => redisBill.id === localBill.id)
      )
    ];
    const currentUserData = {
      ...user,
      bills: JSON.stringify(mergedBills),
    };
    const result = await client.hSet(`users:${user.email}`, currentUserData);
    
    return { message: { status: "success", data: mergedBills } };
  } catch (e) {
    return { error: e };
  }
}
