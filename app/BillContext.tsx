"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MainBillProps, UsersProp, ItemsProps, TaxesProp } from "./types";
import fetchLocalStorage from "./fetchLocalStorage";

type BillContext = {
  bills: MainBillProps[] | null;
  currentBill: MainBillProps | null;
  billId: number;
  billTitle: string;
  billAmountPaid: number;
  billDate: Date;
  users: UsersProp[];
  items: ItemsProps[];
  taxes: TaxesProp[];
  setBills: Dispatch<SetStateAction<MainBillProps[] | null>>;
  setCurrentBill: Dispatch<SetStateAction<MainBillProps | null>>;
  setBillId: Dispatch<SetStateAction<number>>;
  setBillTitle: Dispatch<SetStateAction<string>>;
  setBillAmountPaid: Dispatch<SetStateAction<number>>;
  setBillDatePaid: Dispatch<SetStateAction<Date>>;
  saveBillData: () => void;
  setUsers: Dispatch<SetStateAction<UsersProp[]>>;
  setItems: Dispatch<SetStateAction<ItemsProps[]>>;
  setTaxes: Dispatch<SetStateAction<TaxesProp[]>>;
  randomIdGenerator: () => number;
  calculateSubTotal: () => number;
  calculateBillTax: () => number;
};

type BillContextProviderProps = {
  children: ReactNode;
};

const defaultBill: MainBillProps = {
  id: 1,
  title: "",
  billTotal: 2000,
  dated: new Date(),
  billAmountPaid: 600,
  items: [],
  taxes: [],
  users: [],
  userToItems: [],
  extraFee: [],
};

export const BillContext = createContext<BillContext | null>(null);

export default function BillContextProvider({
  children,
}: BillContextProviderProps) {
  // const [bills, setBills] = useState<MainBillProps | null>(null);

  const [bills, setBills] = fetchLocalStorage<MainBillProps[] | null>(
    "bills",
    null
  );

  const [currentBill, setCurrentBill] = useState<MainBillProps | null>(null);
  const [billId, setBillId] = useState<number>(0);
  const [billTitle, setBillTitle] = useState<string>("");
  const [billAmountPaid, setBillAmountPaid] = useState<number>(0);
  const [billDate, setBillDatePaid] = useState<Date>(new Date());
  const [users, setUsers] = useState<UsersProp[]>([]);
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [taxes, setTaxes] = useState<TaxesProp[]>([]);

  const subTotalRef = useRef(0);
  const taxRef = useRef(0);

  // useEffect(() => {
  //   const currentBill: MainBillProps[] = [
  //     {
  //       id: 1,
  //       name: "Barista",
  //       amount: 2000,
  //       date: new Date(),
  //       amountPaid: 600,
  //       items: [
  //         {
  //           id: 1,
  //           name: "Americano Small",
  //           rate: 170,
  //           quantity: 5,
  //         },
  //         {
  //           id: 2,
  //           name: "Frappe Small",
  //           rate: 305,
  //           quantity: 1,
  //         },
  //         {
  //           id: 3,
  //           name: "Add On hazelnut Flavour",
  //           rate: 50,
  //           quantity: 1,
  //         },
  //       ],
  //       taxes: [
  //         {
  //           id: 1,
  //           taxType: "CGST",
  //           taxPercentage: 2.5,
  //         },
  //         {
  //           id: 2,
  //           taxType: "SGST",
  //           taxPercentage: 2.5,
  //         },
  //       ],
  //       users: [
  //         {
  //           id: 1,
  //           name: "Mihir",
  //         },
  //         {
  //           id: 2,
  //           name: "Shivani",
  //         },
  //         {
  //           id: 3,
  //           name: "Rhea",
  //         },
  //       ],
  //       userToItems: [
  //         {
  //           userId: 1,
  //           items: [
  //             { itemId: 1, quantity: 2 },
  //             { itemId: 2, quantity: 1 },
  //             { itemId: 3, quantity: 1 },
  //           ],
  //         },
  //         {
  //           userId: 2,
  //           items: [{ itemId: 1, quantity: 3 }],
  //         },
  //       ],
  //       extraFee: [
  //         {
  //           id: 1,
  //           feeType: "Convinience Fee",
  //           feeAmount: 300,
  //         },
  //       ],
  //     },
  //   ];

  //   setBills(currentBill);
  // }, []);

  function randomIdGenerator() {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  const fetchBillData = () => {
    if (bills && bills.length > 0) {
      if (billId != 0) {
        const current = bills.filter((bill) => bill.id == billId)[0];
        if (current) {
          setCurrentBill(current);
          setBillTitle(current.title);
          setBillAmountPaid(current.billAmountPaid);
          setBillDatePaid(current.dated);
        }
      }
    }
  };

  const calculateSubTotal = useCallback(() => {
    if (items.length > 0) {
      items.map((item) => {
        subTotalRef.current = subTotalRef.current + item.rate * item.quantity;
      });
    }
    return subTotalRef.current;
  }, [items]);

  const calculateBillTax = useCallback(() => {
    if (taxes.length > 0) {
      taxes.map((tax) => {
        taxRef.current = taxRef.current + tax.taxPercentage;
      });
    }
    return taxRef.current;
  }, [taxes]);

  const saveBillData = useCallback(() => {
    if (billTitle != "" && billAmountPaid != 0 && billDate instanceof Date) {
      if (billId == 0) {
        const current: MainBillProps = defaultBill;
        current.id = randomIdGenerator();
        current.billAmountPaid = billAmountPaid;
        current.title = billTitle;
        current.dated = billDate;
        setCurrentBill(current);
      } else {
        setCurrentBill((prevCurrentBill) => {
          const current = prevCurrentBill;
          if (current) {
            current.title = billTitle;
            current.billAmountPaid = billAmountPaid;
            current.dated = billDate;
          }
          return current;
        });
      }
    }
  }, [defaultBill, bills, setBills]);

  useEffect(() => {
    fetchBillData();
  }, [billId]);

  useEffect(() => {
    if (currentBill && Object.keys(currentBill).length > 0) {
      setBills((prevBills) => {
        if (prevBills) {
          const current = [...prevBills, currentBill];
          return current;
        } else {
          const current = [currentBill];
          return current;
        }
      });
    }
  }, [currentBill, users, items, taxes]);

  return (
    <BillContext.Provider
      value={{
        bills,
        currentBill,
        billId,
        billTitle,
        billAmountPaid,
        billDate,
        users,
        items,
        taxes,
        setBills,
        setCurrentBill,
        setBillId,
        setBillTitle,
        setBillAmountPaid,
        setBillDatePaid,
        saveBillData,
        setUsers,
        setItems,
        setTaxes,
        randomIdGenerator,
        calculateSubTotal,
        calculateBillTax,
      }}
    >
      {children}
    </BillContext.Provider>
  );
}

export function useBillContext() {
  const context = useContext(BillContext);
  if (!context) {
    throw new Error(
      "useBillContext must be called within a BillContextProvider"
    );
  }
  return context;
}
