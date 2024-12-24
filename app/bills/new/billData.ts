export type UsersProp = {
  id: number;
  name: string;
};
export type ItemsProp = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
export type ItemsQuantityProp = {
  itemId: number;
  quantity: number;
};
export type UserItemProp = {
  userId: number;
  items: ItemsQuantityProp[];
};
export type TaxProp = {
  taxType: string;
  taxPercentage: number;
};
export interface ItemsToUserProp {
  users: UsersProp[];
  items: ItemsProp[];
  current: UserItemProp;
}

// Bill No. 1

// export const defaultUsers: UsersProp[] = [
//   {
//     id: 1,
//     name: "Mihir",
//   },
//   {
//     id: 2,
//     name: "Amit",
//   },
//   {
//     id: 3,
//     name: "Shivani",
//   },
// ];
// export const defaultItems: ItemsProp[] = [
//   {
//     id: 1,
//     name: "Americano Small",
//     price: 170,
//     quantity: 5,
//   },
//   {
//     id: 2,
//     name: "Frappe Small",
//     price: 305,
//     quantity: 1,
//   },
//   {
//     id: 3,
//     name: "Add On hazelnut Flavour",
//     price: 50,
//     quantity: 1,
//   },
// ];
// export const defaultUserItems: UserItemProp[] = [
//   {
//     userId: 1,
//     items: [
//       { itemId: 1, quantity: 2 },
//       { itemId: 2, quantity: 1 },
//       { itemId: 3, quantity: 1 },
//     ],
//   },
//   {
//     userId: 2,
//     items: [{ itemId: 1, quantity: 3 }],
//   },
// ];

// export const extraFee = 30;
// export const billPaid = 662.5;

// Bill No. 2

// export const defaultUsers: UsersProp[] = [
//   {
//     id: 1,
//     name: "Mihir",
//   },
//   {
//     id: 2,
//     name: "Amit",
//   },
//   {
//     id: 3,
//     name: "Rhea",
//   },
// ];
// export const defaultItems: ItemsProp[] = [
//   {
//     id: 1,
//     name: "Americano Small",
//     price: 170,
//     quantity: 3,
//   },
//   {
//     id: 2,
//     name: "Frappe Small",
//     price: 305,
//     quantity: 4,
//   },
//   {
//     id: 3,
//     name: "Add On Vanilla Flavour",
//     price: 50,
//     quantity: 4,
//   },
//   {
//     id: 4,
//     name: "Frappe Small",
//     price: 305,
//     quantity: 1,
//   },
//   {
//     id: 5,
//     name: "Mocha Regular",
//     price: 285,
//     quantity: 2,
//   },
// ];
// export const defaultUserItems: UserItemProp[] = [
//   {
//     userId: 1,
//     items: [
//       { itemId: 1, quantity: 1 },
//       { itemId: 2, quantity: 3 },
//       { itemId: 3, quantity: 3 },
//     ],
//   },
//   {
//     userId: 2,
//     items: [{ itemId: 1, quantity: 2 },{ itemId: 4, quantity: 1 }],
//   },
//   {
//     userId: 3,
//     items: [{ itemId: 5, quantity: 2 },{ itemId: 2, quantity: 1 }, { itemId: 3, quantity: 1 }],
//   },
// ];

// export const extraFee = 50;
// export const billPaid = 2108.7;

// Bill No. 3

export const defaultUsers: UsersProp[] = [
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
];
export const defaultItems: ItemsProp[] = [
  {
    id: 1,
    name: "Americano Small",
    price: 170,
    quantity: 3,
  },
  {
    id: 2,
    name: "Frappe Small",
    price: 305,
    quantity: 1,
  },
];
export const defaultUserItems: UserItemProp[] = [
  {
    userId: 1,
    items: [
      { itemId: 1, quantity: 1 },
    ],
  },
  {
    userId: 2,
    items: [{ itemId: 1, quantity: 2 }],
  },
  {
    userId: 3,
    items: [{ itemId: 2, quantity: 1 }],
  },
];

export const extraFee = 10;
export const billPaid = 523.6;

export const defaultTaxes: TaxProp[] = [
  {
    taxType: "CGST",
    taxPercentage: 2.5,
  },
  {
    taxType: "SGST",
    taxPercentage: 2.5,
  },
];

