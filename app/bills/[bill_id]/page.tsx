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

const extraFee = 30;
const billPaid = 662.5;

export default function BillPage({
  params,
}: {
  params: Promise<{ bill_id: string }>;
}) {
  const {
    bills,
    currentBill,
    billId,
    billTitle,
    billAmountPaid,
    billDate,
    users,
    items,
    taxes,
    saveBillData,
    setBillId,
    setBillTitle,
    setBillAmountPaid,
    setBillDatePaid,
  } = useBillContext();

  params.then((response) => {
    setBillId(parseInt(response.bill_id));
  });

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [formattedToday, setFormattedToday] = useState<string>(new Date().toISOString().split("T")[0]);

  const billTitleRef = useRef<HTMLInputElement>(null);
  const billPaidRef = useRef<HTMLInputElement>(null);
  const billDateRef = useRef<HTMLInputElement>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
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

  function onBillPaidChange() {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (billPaidRef.current) {
        setBillAmountPaid(
          !Number.isNaN(parseInt(billPaidRef.current.value))
            ? parseInt(billPaidRef.current.value)
            : 0
        );
      }
    }, 500);
  }

  function onBillDateChange() {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (billDateRef.current) {
        setBillDatePaid(new Date(billDateRef.current.value));
      }
    }, 500);
  }

  function resetBillData() {
    if (billTitleRef.current && billPaidRef.current) {
      billTitleRef.current.value = "";
      billPaidRef.current.value = "";
      setBillTitle("");
      setBillAmountPaid(0);
    }
  }

  useEffect(() => {
    // Set the maximum date to today's date
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
  }, []);

  return (
    <div className="bg-dark rounded-xl py-4 lg:p-8 h-full overflow-hidden overflow-y-auto scroll-smooth">
      <div className="flex justify-center mb-4 lg:mb-8">
        <fieldset className="flex justify-center flex-wrap lg:w-[30%] gap-2 lg:gap-4 border border-light rounded-3xl p-4 lg:p-8 mx-4 lg:mx-0">
          <legend className="text-light bg-dark p-2 font-bold text-2xl">
            {billTitle != "" && `${billTitle} -`}{" "}
            <span className="text-lg">Bill Info</span>
          </legend>
          <div className="rounded-3xl shadow-inner shadow-dark/50 w-full text-center">
            <TextField
              id="bill-name"
              label="Bill Name"
              variant="outlined"
              inputRef={billTitleRef}
              defaultValue={billTitle}
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
          <div className="rounded-3xl shadow-inner shadow-dark/50 w-full text-center">
            <TextField
              id="bill-amount-paid"
              label="Bill Amount Paid"
              variant="outlined"
              inputRef={billPaidRef}
              defaultValue={billAmountPaid}
              onChange={onBillPaidChange}
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
          <div className="rounded-3xl flex justify-center shadow-inner shadow-dark/50 w-full text-center">
            {/* <TextField
              id="bill-date"
              label="Bill Date"
              placeholder="DD/MM/YYYY"
              variant="outlined"
              inputRef={billDateRef}
              defaultValue={billDate}
              onChange={onBillDateChange}
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
            /> */}
            <input
              type="date"
              id="bill-date"
              name="bill-date"
              className="bg-dark text-light border border-light px-6 py-3 text-xl rounded-lg"
              ref={billDateRef}
              max={formattedToday}
              value={billDate.toString()}
              onChange={onBillDateChange}
            ></input>
          </div>
          <div className="rounded-3xl flex justify-center gap-2 shadow-inner shadow-dark/50 w-full">
            <Button variant="outlined" onClick={resetBillData}>
              Clear
            </Button>
            <Button variant="contained" onClick={saveBillData}>
              Save
            </Button>
          </div>
        </fieldset>
      </div>
      {currentBill && Object.keys(currentBill).length > 0 && (
        <>
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
              <AccordionDetails className="p-0 lg:p-4">
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
              <AccordionDetails className="p-0 lg:p-4">
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
              <AccordionDetails className="p-0 lg:p-4">
                <Taxes />
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="mt-8">
            <BillInfoPage />
          </div>
        </>
      )}
    </div>
  );
}
