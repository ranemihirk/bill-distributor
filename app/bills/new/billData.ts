import { MainBillProps, UsersProp, ItemsProps, TaxesProp } from "@/app/types";

export const bills: MainBillProps[] = [
  {
    id: 1,
    title: "Barista",
    billTotal: 1265,
    dated: new Date("11/17/2024"),
    billAmountPaid: 662.5,
    items: [
      {
        id: 1,
        name: "Americano Small",
        rate: 170,
        quantity: 5,
      },
      {
        id: 2,
        name: "Frappe Small",
        rate: 305,
        quantity: 1,
      },
      {
        id: 3,
        name: "Add On hazelnut Flavour",
        rate: 50,
        quantity: 1,
      },
    ],
    taxes: [
      {
        id: 1,
        taxType: "CGST",
        taxPercentage: 2.5,
      },
      {
        id: 2,
        taxType: "SGST",
        taxPercentage: 2.5,
      },
    ],
    users: [
      {
        id: 1,
        name: "Mihir",
      },
      {
        id: 2,
        name: "Amit",
      },
    ],
    userToItems: [
      {
        userId: 1,
        items: [
          { itemId: 1, quantity: 2 },
          { itemId: 2, quantity: 1 },
          { itemId: 3, quantity: 1 },
        ],
      },
      {
        userId: 2,
        items: [{ itemId: 1, quantity: 3 }],
      },
    ],
    extraFee: [{ feeAmount: 30 }],
  },
  {
    id: 2,
    title: "Barista",
    billTotal: 2941,
    dated: new Date("11/28/2024"),
    billAmountPaid: 2108.7,
    items: [
      {
        id: 1,
        name: "Americano Small",
        rate: 170,
        quantity: 3,
      },
      {
        id: 2,
        name: "Frappe Small",
        rate: 305,
        quantity: 4,
      },
      {
        id: 3,
        name: "Add On Vanilla Flavour",
        rate: 50,
        quantity: 4,
      },
      {
        id: 4,
        name: "Frappe Small",
        rate: 305,
        quantity: 1,
      },
      {
        id: 5,
        name: "Mocha Regular",
        rate: 285,
        quantity: 2,
      },
    ],
    taxes: [
      {
        id: 1,
        taxType: "CGST",
        taxPercentage: 2.5,
      },
      {
        id: 2,
        taxType: "SGST",
        taxPercentage: 2.5,
      },
    ],
    users: [
      {
        id: 1,
        name: "Mihir",
      },
      {
        id: 2,
        name: "Amit",
      },
      {
        id: 3,
        name: "Rhea",
      },
    ],
    userToItems: [
      {
        userId: 1,
        items: [
          { itemId: 1, quantity: 1 },
          { itemId: 2, quantity: 3 },
          { itemId: 3, quantity: 3 },
        ],
      },
      {
        userId: 2,
        items: [
          { itemId: 1, quantity: 2 },
          { itemId: 4, quantity: 1 },
        ],
      },
      {
        userId: 3,
        items: [
          { itemId: 5, quantity: 2 },
          { itemId: 2, quantity: 1 },
          { itemId: 3, quantity: 1 },
        ],
      },
    ],
    extraFee: [{ feeAmount: 50 }],
  },
  {
    id: 3,
    title: "Barista",
    billTotal: 856,
    dated: new Date("12/23/2024"),
    billAmountPaid: 523.6,
    items: [
      {
        id: 1,
        name: "Americano Small",
        rate: 170,
        quantity: 3,
      },
      {
        id: 2,
        name: "Frappe Small",
        rate: 305,
        quantity: 1,
      },
    ],
    taxes: [
      {
        id: 1,
        taxType: "CGST",
        taxPercentage: 2.5,
      },
      {
        id: 2,
        taxType: "SGST",
        taxPercentage: 2.5,
      },
    ],
    users: [
      {
        id: 1,
        name: "Mihir",
      },
      {
        id: 2,
        name: "Amit",
      },
      {
        id: 3,
        name: "Yash",
      },
    ],
    userToItems: [
      {
        userId: 1,
        items: [{ itemId: 1, quantity: 1 }],
      },
      {
        userId: 2,
        items: [{ itemId: 1, quantity: 2 }],
      },
      {
        userId: 3,
        items: [{ itemId: 2, quantity: 1 }],
      },
    ],
    extraFee: [{ feeAmount: 10 }],
  },
  {
    id: 4,
    title: "Barista",
    billTotal: 893,
    dated: new Date("01/03/2025"),
    billAmountPaid: 635.1,
    items: [
      {
        id: 1,
        name: "Americano Small",
        rate: 170,
        quantity: 5,
      },
    ],
    taxes: [
      {
        id: 1,
        taxType: "CGST",
        taxPercentage: 2.5,
      },
      {
        id: 2,
        taxType: "SGST",
        taxPercentage: 2.5,
      },
    ],
    users: [
      {
        id: 1,
        name: "Mihir",
      },
      {
        id: 2,
        name: "Amit",
      },
    ],
    userToItems: [
      {
        userId: 1,
        items: [{ itemId: 1, quantity: 3 }],
      },
      {
        userId: 2,
        items: [{ itemId: 1, quantity: 2 }],
      },
    ],
    extraFee: [{ feeAmount: 10 }],
  },
  {
    id: 5,
    title: "Barista",
    billTotal: 1034,
    dated: new Date("01/08/2024"),
    billAmountPaid: 837.2,
    items: [
      {
        id: 1,
        name: "Americano Small",
        rate: 170,
        quantity: 4,
      },
      {
        id: 2,
        name: "Frappe Small",
        rate: 305,
        quantity: 1,
      },
    ],
    taxes: [
      {
        id: 1,
        taxType: "CGST",
        taxPercentage: 2.5,
      },
      {
        id: 2,
        taxType: "SGST",
        taxPercentage: 2.5,
      },
    ],
    users: [
      {
        id: 1,
        name: "Mihir",
      },
      {
        id: 2,
        name: "Amit",
      },
    ],
    userToItems: [
      {
        userId: 1,
        items: [
          { itemId: 1, quantity: 2 },
          { itemId: 2, quantity: 1 },
        ],
      },
      {
        userId: 2,
        items: [{ itemId: 1, quantity: 2 }],
      },
    ],
    extraFee: [{ feeAmount: 10 }],
  },
];
