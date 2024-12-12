"use client";
import React, { lazy, useRef, useEffect, useState } from "react";

import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons/faPenToSquare";
import { faCaretSquareDown } from "@fortawesome/free-regular-svg-icons/faCaretSquareDown";

import BillToUserInfo from "./BillToUserInfo";
import { useBillContext } from "@/app/BillContext";
import NewBillPage from "./../new/page";
import Users from "@/app/Users";
import Items from "@/app/Items";
import Taxes from "@/app/Taxes";
import BillInfoPage from "./BillInfo";
import "./bill.css";

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

const extraFee = 30;
const billPaid = 662.5;

export default function BillPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { bills, users, items, taxes } = useBillContext();

  // const [users, setUsers] = useState<UsersProp[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  // const [items, setItems] = useState<ItemsProp[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  // const [taxes, setTaxes] = useState<TaxProp[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  // const [itemsToUser, setItemsToUser] = useState<UserItemProp[] | null>(null); // Change 'defaultUsers' to null when actual users can be added.
  // const [subTotal, setSubTotal] = useState<number>(0);
  // const [billTotal, setBillTotal] = useState<number>(0);
  const [drawerType, setDrawerType] = useState<string>("");
  const [billTitle, setBillTitle] = useState<string>("");

  const billTitleRef = useRef<HTMLInputElement>(null);

  // const subTotalRef = useRef<number>(0);
  // const taxTotalRef = useRef<number>(0);

  function openDrawerType(type: string) {
    setIsDrawerOpen(true);
    setDrawerType(type);
  }

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const styles = {
    input: {
      color: "white",
    },
  };

  function onBillTitleChange() {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (billTitleRef.current) {
        setBillTitle(billTitleRef.current.value);
      }
    }, 500);
  }

  // function calculateSubTotal() {
  //   if (items != null && items?.length > 0) {
  //     let current = 0;
  //     items?.forEach((item) => {
  //       subTotalRef.current = subTotalRef.current + item.price * item.quantity;
  //     });
  //     setSubTotal(subTotalRef.current);
  //   }
  // }

  // function calculateBillTotal() {
  //   if (taxes != null && taxes?.length > 0) {
  //     let current = 0;
  //     taxes?.map((item) => {
  //       taxTotalRef.current =
  //         taxTotalRef.current +
  //         subTotalRef.current * (item.taxPercentage / 100);
  //     });
  //     setBillTotal(Math.round(subTotal + taxTotalRef.current));
  //   }
  // }

  // useEffect(() => {
  //   setUsers(defaultUsers);
  //   setTaxes(defaultTaxes);
  //   setItems(defaultItems);
  //   setItemsToUser(defaultUserItems);
  //   console.log("bills: ", bills);
  // }, []);

  // useEffect(() => {
  //   // console.log("items: ", items);
  //   subTotalRef.current = 0;
  //   taxTotalRef.current = 0;
  //   calculateSubTotal();
  // }, [items]);

  // useEffect(() => {
  //   calculateBillTotal();
  // }, [subTotal]);

  return (
    <div className="bg-dark rounded-xl py-4 lg:p-8 h-full overflow-hidden overflow-y-auto scroll-smooth">
      <div className="flex justify-center items-center mb-4 lg:mb-8">
        <div className="p-1 lg:p-2 rounded-3xl shadow-inner shadow-dark/50">
          <TextField
            id="bill-name"
            label="Bill Name"
            variant="outlined"
            ref={billTitleRef}
            onChange={onBillTitleChange}
            className="text-4xl bill-title rounded-lg border border-light autofill:bg-dark"
            slotProps={{
              htmlInput: {
                className:
                  "text-light bill-title bg-dark autofill:bg-dark border-light rounded-lg outline-none active:outline-none focus:outline-none",
              },
              inputLabel: {
                className:
                  "text-light bill-title bg-dark rounded-md px-1 lg:px-2 autofill:bg-dark active:outline-none focus:outline-none outline-none",
              },
              select: {
                className:
                  "border border-light bill-title rounded-lg active:outline-none focus:outline-none",
              },
            }}
            sx={{ border: 1 }}
          />
        </div>
      </div>
      {/* <Button onClick={() => openDrawerType("users")}>Users</Button>
      <Button onClick={() => openDrawerType("items")}>Items</Button>
      <Button onClick={() => openDrawerType("taxes")}>Taxes</Button> */}

      {/* <h1 className="text-4xl lg:text-6xl font-bold text-center">Invoice</h1>
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
            {billPaid} - {Math.round(((billPaid - extraFee) / billTotal) * 100)}
            %
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
      /> */}

      {/* <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="p-4 w-[50vw]">
          <div className="flex justify-between items-center p-2">
            <div></div>
            <h3 className="text-bold text-center text-2xl capitalize">{drawerType}</h3>
            <button className="" onClick={() => setIsDrawerOpen(false)}>
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-inherit text-2xl"
              />
            </button>
          </div>
          {drawerType == "users" ? (
            <Users />
          ) : drawerType == "items" ? (
            <Items />
          ) : drawerType == "taxes" ? (
            <Taxes />
          ) : (
            <Users />
          )}
        </div>
      </Drawer> */}

      <div className="lg:rounded-3xl bg-light lg:p-4 shadow-inner shadow-dark/50">
        <Accordion
          className="border"
          disabled={billTitle != "" ? false : true}
          defaultExpanded={
            users.length > 0 && items.length > 0 && taxes.length > 0
              ? true
              : false
          }
          expanded={expanded === "users"}
          onChange={handleChange("users")}
        >
          <AccordionSummary
            expandIcon={
              <FontAwesomeIcon
                icon={faCaretSquareDown}
                className="text-light"
              />
            }
            aria-controls="users-content"
            id="users-header"
            className="bg-dark text-light"
          >
            Users
          </AccordionSummary>
          <AccordionDetails>
            <Users />
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="border"
          disabled={users.length > 0 ? false : true}
          expanded={expanded === "items"}
          onChange={handleChange("items")}
        >
          <AccordionSummary
            expandIcon={
              <FontAwesomeIcon
                icon={faCaretSquareDown}
                className="text-light"
              />
            }
            aria-controls="items-content"
            id="items-header"
            className="bg-dark text-light"
          >
            Items
          </AccordionSummary>
          <AccordionDetails>
            <Items />
          </AccordionDetails>
        </Accordion>
        <Accordion
          className="border"
          disabled={items.length > 0 ? false : true}
          expanded={expanded === "taxes"}
          onChange={handleChange("taxes")}
        >
          <AccordionSummary
            expandIcon={
              <FontAwesomeIcon
                icon={faCaretSquareDown}
                className="text-light"
              />
            }
            aria-controls="taxes-content"
            id="taxes-header"
            className="bg-dark text-light"
          >
            Taxes
          </AccordionSummary>
          <AccordionDetails>
            <Taxes />
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="mt-8">
      <BillInfoPage />
      </div>
    </div>
  );
}
