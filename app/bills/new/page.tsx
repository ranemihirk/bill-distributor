"use client";
import React, { lazy, useRef, useEffect, useState } from "react";
import BillToUserInfo from "./BillToUserInfo";
import {
  UsersProp,
  ItemsProp,
  TaxProp,
  UserItemProp,
  defaultUsers,
  defaultItems,
  defaultUserItems,
  defaultTaxes,
  extraFee,
  billPaid,
} from "./billData";

export default function BillPage() {
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
  useEffect(() => {
    setUsers(defaultUsers);
    setTaxes(defaultTaxes);
    setItems(defaultItems);
    setItemsToUser(defaultUserItems);
  }, []);
  useEffect(() => {
    // console.log("items: ", items);
    subTotalRef.current = 0;
    taxTotalRef.current = 0;
    calculateSubTotal();
  }, [items]);
  useEffect(() => {
    calculateBillTotal();
  }, [subTotal]);
  return (
    <div>
      <h1 className="text-4xl lg:text-6xl font-bold text-center">Invoice</h1>
      <table className="table-auto w-full text-center">
        <tr className="lg:text-3xl bg-black text-white dark:bg-white dark:text-black">
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
          <th className="border lg:text-xl" colSpan={2}>
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
              <th className="border lg:text-xl" colSpan={2}>
                {item.taxType} {item.taxPercentage}% on {subTotal}
              </th>
              <th className="border" colSpan={2}>
                {subTotal * (item.taxPercentage / 100)}
              </th>
            </tr>
          ))}
        <tr>
          <th className="border lg:text-xl" colSpan={2}>
            Bill Total
          </th>
          <th className="border" colSpan={2}>
            {billTotal}
          </th>
        </tr>
        <tr>
          <th className="border lg:text-xl" colSpan={2}>
            Convinience Fee
          </th>
          <th className="border" colSpan={2}>
            {extraFee}
          </th>
        </tr>
        <tr>
          <th className="border lg:text-xl" colSpan={2}>
            Bill Paid
          </th>
          <th className="border" colSpan={2}>
            {billPaid} -{" "}
            {100 - Math.round(((billPaid - extraFee) / billTotal) * 100)}%
          </th>
        </tr>
      </table>
      <br />
      <br />
      <BillToUserInfo
        users={users}
        items={items}
        itemsToUser={itemsToUser}
        extraFee={extraFee}
        billPaid={billPaid}
        billTotal={billTotal}
      />
    </div>
  );
}
