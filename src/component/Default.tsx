import React, { lazy, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "./assets/imgs/rmklogo.png";
import Button from "@mui/material/Button";
import ItemsToUsers from "./ItemsToUsers";

type UsersProp = {
  id: number;
  name: string;
};

type ItemsProp = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type ItemsQuantityProp = {
  itemId: number;
  quantity: number;
};

type UserItemProp = {
  userId: number;
  items: ItemsQuantityProp[];
};

type TaxProp = {
  taxType: string;
  taxPercentage: number;
};

interface ItemsToUserProp {
  users: UsersProp[];
  items: ItemsProp[];
  current: UserItemProp;
}

const defaultUser = {
  id: 1,
  name: "Mihir",
};

const defaultUsers: UsersProp[] = [
  {
    id: 1,
    name: "Mihir",
  },
  {
    id: 2,
    name: "Shivani",
  },
  {
    id: 3,
    name: "Rhea",
  },
];

const defaultItems: ItemsProp[] = [
  {
    id: 1,
    name: "Americano Small",
    price: 170,
    quantity: 5,
  },
  {
    id: 2,
    name: "Frappe Small",
    price: 305,
    quantity: 1,
  },
  {
    id: 3,
    name: "Add On hazelnut Flavour",
    price: 50,
    quantity: 1,
  },
];

const defaultUserItems: UserItemProp[] = [
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
];

const defaultTaxes: TaxProp[] = [
  {
    taxType: "CGST",
    taxPercentage: 2.5,
  },
  {
    taxType: "SGST",
    taxPercentage: 2.5,
  },
];

export default function Default() {
  const [users, setUsers] = useState<UsersProp[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  const [items, setItems] = useState<ItemsProp[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  const [taxes, setTaxes] = useState<TaxProp[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  const [itemsToUser, setItemsToUser] = useState<UserItemProp[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  const [subTotal, setSubTotal] = useState<number>(0);
  const [billTotal, setBillTotal] = useState<number>(0);

  const subTotalRef = useRef<number>(0);
  const taxTotalRef = useRef<number>(0);

  function calculateSubTotal() {
    if (items != null && items?.length > 0) {
      let current = 0;
      items?.forEach((item) => {
        subTotalRef.current = subTotalRef.current + item.price * item.quantity;
      });
      setSubTotal(subTotalRef.current);
    }
  }

  function calculateBillTotal() {
    if (taxes != null && taxes?.length > 0) {
      let current = 0;
      taxes?.map((item) => {
        taxTotalRef.current =
          taxTotalRef.current +
          subTotalRef.current * (item.taxPercentage / 100);
      });
      setBillTotal(Math.round(subTotal + taxTotalRef.current));
    }
  }

  const getCurrentUser = (userId: number) => {
    if (users) {
      return users.find((user) => user.id == userId);
    }
  };

  useEffect(() => {
    setUsers(defaultUsers);
    setTaxes(defaultTaxes);
    setItems(defaultItems);
    setItemsToUser(defaultUserItems);
  }, []);

  useEffect(() => {
    console.log("items: ", items);
    subTotalRef.current = 0;
    taxTotalRef.current = 0;
    calculateSubTotal();
  }, [items]);

  useEffect(() => {
    calculateBillTotal();
  }, [subTotal]);

  return (
    <div>
      <h1 className="text-8xl text-center">Invoice</h1>
      <table className="table-auto w-full text-center">
        <tr className="text-3xl">
          <th className="border">Item</th>
          <th className="border">Rate</th>
          <th className="border">Quantity</th>
          <th className="border">Amount</th>
        </tr>
        {items != null &&
          items.length > 0 &&
          items.map((item) => (
            <tr key={"item_" + item.id}>
              <td className="border">{item.name}</td>
              <td className="border">{item.price}</td>
              <td className="border">{item.quantity}</td>
              <td className="border">{item.price * item.quantity}</td>
            </tr>
          ))}
        <tr>
          <th className="border text-xl" colSpan={2}>
            Sub Total
          </th>
          <th className="border" colSpan={2}>
            {subTotal}
          </th>
        </tr>
        {taxes != null &&
          taxes.length > 0 &&
          taxes.map((item) => (
            <tr key={"tax_" + item.taxType}>
              <th className="border text-xl" colSpan={2}>
                {item.taxType} {item.taxPercentage}% on {subTotal}
              </th>
              <th className="border" colSpan={2}>
                {subTotal * (item.taxPercentage / 100)}
              </th>
            </tr>
          ))}
        <tr>
          <th className="border text-xl" colSpan={2}>
            Bill Total
          </th>
          <th className="border" colSpan={2}>
            {billTotal}
          </th>
        </tr>
      </table>
      <br />
      <br />
      <table className="table-auto w-full text-center">
        <tr className="text-3xl">
          <th className="border">User</th>
          <th className="border">Order</th>
        </tr>

        {itemsToUser != null &&
          users != null &&
          items != null &&
          itemsToUser.length > 0 &&
          itemsToUser.map((user) => (
            <>
              <tr>
                <td className="border">{getCurrentUser(user.userId)?.name}</td>
                <td className="border">
                  <table className="w-full">
                    <tr>
                      <th className="border">Item</th>
                      <th className="border">Rate</th>
                      <th className="border">Quantity</th>
                      <th className="border">Amount</th>
                    </tr>
                    {user.items.map(
                      (item) =>
                        user &&
                        item && (
                          <ItemsToUsers
                            users={users}
                            items={items}
                            currentUser={
                              getCurrentUser(user.userId) || defaultUser
                            }
                            currentItemsToUser={item}
                          />
                        )
                    )}
                    <tr>
                      <th className="border" colSpan={2}>
                        Bill Amount
                      </th>
                      <th className="border" colSpan={2}>
                        123
                      </th>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr className="h-4"></tr>
            </>
          ))}
      </table>
    </div>
  );
}
