"use client";
import React, { lazy, useRef, useEffect, useState } from "react";
import { useBillContext } from "@/contexts/BillContext";
import { useAuthContext } from "@/contexts/AuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons/faTrashCan";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons/faArrowAltCircleLeft";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { MainBillProps } from "@/lib/types";

// function createData(id: number, name: string, amount: number, dated: Date) {
//   return { id, name, amount, dated };
// }

// const bills = [
//   createData(1, "Stacks & Racks", 2000, new Date()),
//   createData(2, "Starbucks", 2000, new Date()),
//   createData(3, "Barista", 2000, new Date()),
// ];

export default function BillsListPage({
  data,
}: {
  data: MainBillProps[] | null;
}) {
  const { user } = useAuthContext();
  const { isLargeScreen, bills, setBills } = useBillContext();

  const getDate = (currentDate: Date) => {
    let date;
    if (currentDate) {
      date = new Date(currentDate);
    } else {
      date = new Date();
    }

    const newDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    return newDate;
  };

  const deleteBill = (billId: number | null) => {
    if (billId && bills && bills.length > 0) {
      const current = bills.filter((bill) => bill.id != billId);
      setBills(current);
    }
  };

  useEffect(() => {
    if (data != null) {
      setBills(data);
    }
  }, []);

  return (
    <>
      <div className={`${user && 'hidden'}`}>
        <div className="flex items-center w-fit p-4 m-auto mb-4 rounded-xl bg-red/20 text-red">
          <FontAwesomeIcon className="mr-2" icon={faCircleExclamation} />
          <h3>
            These bill are stored on your device only if you are not logged in.
            Clearing your browser's history will erase these bills.
          </h3>
        </div>
      </div>
      <div className="flex justify-between mb-16">
        <Link href="/">
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            className="text-dark"
            size="2xl"
          />
        </Link>
        <h1 className="text-3xl font-bold">Bills</h1>{" "}
        <Tooltip title="Add Bill">
          <Link
            href="/bills/0"
            className="border border-dark px-4 py-2 rounded-lg hover:bg-dark hover:text-light hover:shadow-lg transition-all font-bold"
          >
            + Add Bill
          </Link>
        </Tooltip>
      </div>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          className="shadow-inner"
          sx={{ tableLayout: `${isLargeScreen ? "auto" : "fixed"}` }}
        >
          <TableHead>
            <TableRow className="bg-gray text-light">
              <TableCell align="center" className="text-inherit font-bold">
                Bills
              </TableCell>
              <TableCell align="center" className="text-inherit font-bold">
                Amount
              </TableCell>
              <TableCell align="center" className="text-inherit font-bold">
                Date
              </TableCell>
              <TableCell align="center" className="text-inherit font-bold">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills && bills.length > 0 ? (
              bills.map((bill) => (
                <TableRow
                  key={bill.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {bill.title}
                  </TableCell>
                  <TableCell align="center">{bill.billTotal}</TableCell>
                  <TableCell align="center">
                    {/* {bill.dated?.getDate()} / {bill.dated?.getMonth()} /{" "}
                    {bill.dated?.getFullYear()} */}
                    {getDate(bill.dated)}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <Tooltip title="View Bill">
                        <Link
                          className="border border-solid text-base rounded-md px-4 py-2 border-green text-green text-bold hover:bg-green/30"
                          href={`/bills/${bill.id}`}
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-inherit"
                          />{" "}
                          {isLargeScreen && "View"}
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete Bill">
                        <IconButton
                          className="border border-solid text-base rounded-md px-4 py-2 border-red text-red text-bold hover:bg-red/30"
                          aria-label="delete"
                          onClick={() => {
                            deleteBill(bill.id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="text-inherit"
                          />{" "}
                          {isLargeScreen && "Delete"}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  colSpan={4}
                >
                  <h3 className="font-bold text-xl text-center">
                    No Bills Yet!
                  </h3>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
