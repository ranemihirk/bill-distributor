"use client";
import React, {
  lazy,
  useRef,
  useEffect,
  useState,
  SyntheticEvent,
} from "react";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons/faArrowAltCircleLeft";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useBillContext } from "@/app/BillContext";
import BillToUserInfo from "./BillToUserInfo";
import {
  MainBillProps,
  UsersProp,
  ItemsProps,
  TaxesProp,
  UserToItemsProp,
} from "@/app/types";
import { bills } from "./billData";

export default function BillPage() {
  const { isLargeScreen } = useBillContext();

  const [bill, setBill] = useState<MainBillProps | null>(null);
  const [users, setUsers] = useState<UsersProp[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  const [items, setItems] = useState<ItemsProps[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  const [taxes, setTaxes] = useState<TaxesProp[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  const [itemsToUser, setItemsToUser] = useState<UserToItemsProp[] | null>(
    null
  ); // Change 'defaultUsers' to null when actual users can be added.
  const [subTotal, setSubTotal] = useState<number>(0);
  const [billTotal, setBillTotal] = useState<number>(0);

  const subTotalRef = useRef<number>(0);
  const taxTotalRef = useRef<number>(0);

  function calculateSubTotal() {
    if (items != null && items?.length > 0) {
      let current = 0;
      items?.forEach((item) => {
        subTotalRef.current = subTotalRef.current + item.rate * item.quantity;
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
    if (bill != null) {
      setUsers(bill.users);
      setTaxes(bill.taxes);
      setItems(bill.items);
      setItemsToUser(bill.userToItems);
    }
  }, [bill]);

  useEffect(() => {
    subTotalRef.current = 0;
    taxTotalRef.current = 0;
    calculateSubTotal();
  }, [items]);

  useEffect(() => {
    calculateBillTotal();
  }, [subTotal]);

  const [alignment, setAlignment] = React.useState<number | null>(0);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(Number(newAlignment));
    setBill(bills[Number(newAlignment)]);
  };

  useEffect(() => {
    if (alignment != null) {
      setBill(bills[alignment]);
    }
  }, []);

  return (
    <div className="py-4 lg:py-8">
      <div className="mb-4">
        <Link href="/">
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            className="text-dark"
            size="2xl"
          />
        </Link>
      </div>

      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        className={`w-full justify-center ${!isLargeScreen && "flex-wrap"}`}
      >
        {bills.map((bill, key) => (
          <ToggleButton
            key={key}
            value={key}
            aria-label="left aligned"
            className="grow"
          >
            {bill.title}
            <br />(
            {`${bill.dated.toLocaleString("default", {
              weekday: "long",
            })} - ${bill.dated.getDate()}/${
              bill.dated.getMonth() + 1
            }/${bill.dated.getFullYear()}`}
            )
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div>
        {bill != null && (
          <>
            <h1 className="text-4xl lg:text-6xl font-bold text-center">
              Invoice
            </h1>
            <h3 className="text-2xl lg:text-3xl font-bold text-center">
              {bill.title} - (
              {`${bill.dated.toLocaleString("default", {
                weekday: "long",
              })} - ${bill.dated.getDate()}/${
                bill.dated.getMonth() + 1
              }/${bill.dated.getFullYear()}`}
              )
            </h3>
            <table className="table-auto w-full text-center">
              <tr className="lg:text-3xl bg-black text-white dark:bg-white dark:text-black">
                <th className="border">Item</th>
                <th className="border">Rate</th>
                <th className="border">Quantity</th>
                <th className="border">Amount</th>
              </tr>
              {bill.items != null &&
                bill.items.length > 0 &&
                bill.items.map((item) => (
                  <tr key={"item_" + item.id}>
                    <td className="border">{item.name}</td>
                    <td className="border">{item.rate}</td>
                    <td className="border">{item.quantity}</td>
                    <td className="border">{item.rate * item.quantity}</td>
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
              {bill.taxes != null &&
                bill.taxes.length > 0 &&
                bill.taxes.map((item) => (
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
                  {bill.extraFee[0].feeAmount}
                </th>
              </tr>
              <tr>
                <th className="border lg:text-xl" colSpan={2}>
                  Bill Paid
                </th>
                <th className="border" colSpan={2}>
                  {bill.billAmountPaid} -{" "}
                  {100 -
                    Math.round(
                      ((bill.billAmountPaid - bill.extraFee[0].feeAmount) /
                        billTotal) *
                        100
                    )}
                  %
                </th>
              </tr>
            </table>
            <br />
            <br />
            <BillToUserInfo
              users={bill.users}
              items={bill.items}
              itemsToUser={bill.userToItems}
              extraFee={bill.extraFee[0].feeAmount}
              billPaid={bill.billAmountPaid}
              billTotal={bill.billTotal}
            />
          </>
        )}
      </div>
    </div>
  );
}
