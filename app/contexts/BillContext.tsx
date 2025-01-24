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
import { MainBillProps, UsersProp, ItemsProps, TaxesProp } from "../lib/types";
import fetchLocalStorage from "@/lib/fetchLocalStorage";
import useMediaQuery from "@mui/material/useMediaQuery";

type BillContext = {
  isLargeScreen: boolean;
  bills: MainBillProps[] | null;
  currentBill: MainBillProps | null;
  billId: number;
  billTitle: string;
  billAmountPaid: number;
  billDate: Date | string;
  users: UsersProp[];
  items: ItemsProps[];
  taxes: TaxesProp[];
  fetchAllBills: () => void;
  fetchBillData: (id: number) => MainBillProps | null;
  setBills: Dispatch<SetStateAction<MainBillProps[] | null>>;
  setCurrentBill: Dispatch<SetStateAction<MainBillProps | null>>;
  setBillId: Dispatch<SetStateAction<number>>;
  setBillTitle: Dispatch<SetStateAction<string>>;
  setBillAmountPaid: Dispatch<SetStateAction<number>>;
  setBillDatePaid: Dispatch<SetStateAction<Date | string>>;
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
  billTotal: 0,
  dated: new Date(),
  billAmountPaid: 0,
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
  const [bills, setBills] = fetchLocalStorage<MainBillProps[] | null>(
    "bills",
    null
  ); // ToDo: Comment when Redis is implemented.

  // const [bills, setBills] = useState<MainBillProps[] | null>(null); // ToDo: Uncomment when Redis is implemented.

  const [currentBill, setCurrentBill] = useState<MainBillProps | null>(null);
  const [billId, setBillId] = useState<number>(0);
  const [billTitle, setBillTitle] = useState<string>("");
  const [billAmountPaid, setBillAmountPaid] = useState<number>(0);
  const [billDate, setBillDatePaid] = useState<Date | string>(new Date());
  const [users, setUsers] = useState<UsersProp[]>([]);
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [taxes, setTaxes] = useState<TaxesProp[]>([]);

  const billTotalRef = useRef(0);
  const subTotalRef = useRef(0);
  const taxRef = useRef(0);

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  function randomIdGenerator() {
    return Math.floor(Math.random() * 1000000) + 1;
  }
  async function fetchAllBills() {
    const apiCallPath = `/api/fetchBillData`;
    let res = await fetch(apiCallPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setBills(result.bills);
  }

  const callUpdateBillDataAPI = async (current: MainBillProps) => {
    const apiCallPath = `/api/updateBillData`;
    let res = await fetch(apiCallPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(current),
    });
    const result = await res.json();
  };

  const fetchBillData = (bill_id: number) => {
    setBillId(bill_id);
    if (bills && bills.length > 0) {
      if (bill_id != 0) {
        const current = bills.filter((bill) => bill.id == bill_id)[0];
        if (current) {
          setCurrentBill(current);
          setBillTitle(current.title);
          setBillAmountPaid(current.billAmountPaid);
          setBillDatePaid(current.dated);
          setUsers(current.users);
          setItems(current.items);
          setTaxes(current.taxes);
          return current;
        }
      } else {
        resetBillData();
      }
    }
    return null;
  };

  const calculateSubTotal = useCallback(() => {
    if (items.length > 0) {
      subTotalRef.current = 0;
      items.map((item) => {
        subTotalRef.current = subTotalRef.current + item.rate * item.quantity;
      });
    }
    return subTotalRef.current;
  }, [items]);

  const calculateBillTax = useCallback(() => {
    if (taxes.length > 0) {
      taxRef.current = 0;
      taxes.map((tax) => {
        taxRef.current = taxRef.current + tax.taxPercentage;
      });
    }
    return taxRef.current;
  }, [taxes]);

  const saveBillData = useCallback(() => {
    if (billTitle != "" && billAmountPaid != 0 && billDate instanceof Date) {
      if (billId == 0) {
        const currentBillId = randomIdGenerator();
        setBillId(currentBillId);
        const current: MainBillProps = defaultBill;
        current.id = currentBillId;
        current.billAmountPaid = billAmountPaid;
        current.title = billTitle;
        current.dated = billDate;
        setCurrentBill(current);
      } else {
        if (currentBill) {
          const current = currentBill;
          current.title = billTitle;
          current.billAmountPaid = billAmountPaid;
          current.dated = billDate;
          setCurrentBill(current);
        }
      }
    }
  }, [
    defaultBill,
    billTitle,
    billAmountPaid,
    billDate,
    currentBill,
    bills,
    randomIdGenerator,
    setBillId,
    setCurrentBill,
    setBills,
  ]);

  const saveToBills = useCallback(() => {
    if (currentBill && Object.keys(currentBill).length > 0) {
      setCurrentBill((prevCurrentBill) => {
        const current: MainBillProps | null = prevCurrentBill;
        if (current) {
          // callUpdateBillDataAPI(current);

          billTotalRef.current = subTotalRef.current + (subTotalRef.current * taxRef.current) / 100;
          current.billAmountPaid = billAmountPaid;
          current.users = users;
          current.items = items;
          current.taxes = taxes;
          current.billTotal = billTotalRef.current;
          setBills(
            (prevBills) =>
              prevBills &&
              prevBills.map((bill) => (bill.id == billId ? currentBill : bill))
          );
          return current;
        }
        return prevCurrentBill;
      });
    }
  }, [
    bills,
    currentBill,
    billId,
    users,
    items,
    taxes,
    billAmountPaid,
    setBills,
    setCurrentBill,
    callUpdateBillDataAPI,
  ]);

  const resetBillData = useCallback(() => {
    setCurrentBill(null);
    setBillTitle("");
    setBillAmountPaid(0);
    setBillDatePaid(new Date());
    setUsers([]);
    setItems([]);
    setTaxes([]);
  }, [
    setCurrentBill,
    setBillTitle,
    setBillAmountPaid,
    setBillDatePaid,
    setUsers,
    setItems,
    setTaxes,
  ]);

  useEffect(() => {
    console.log("bills: ", bills);
  }, [bills]);

  useEffect(() => {
    saveToBills();
  }, [users, items, taxes]);

  useEffect(() => {
    const setBillAndStore = async () => {
      if (currentBill) {
        // await callUpdateBillDataAPI(currentBill);

        setBills((prevBills) => {
          if (prevBills && prevBills.length > 0) {
            let exists = prevBills.some((bill) => bill.id === billId);
            if (exists) {
              return prevBills.map((bill) =>
                bill.id == billId ? currentBill : bill
              );
            } else {
              return [...prevBills, currentBill];
            }
          } else {
            return [currentBill];
          }
        });
      }
    };

    setBillAndStore();
  }, [currentBill]);

  return (
    <BillContext.Provider
      value={{
        isLargeScreen,
        bills,
        currentBill,
        billId,
        billTitle,
        billAmountPaid,
        billDate,
        users,
        items,
        taxes,
        fetchAllBills,
        fetchBillData,
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
