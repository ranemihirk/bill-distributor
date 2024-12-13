"use client";
import React, { lazy, useRef, useEffect, useState } from "react";
import { useBillContext } from "@/app/BillContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons/faTrashCan";
import { dividerClasses } from "@mui/material";

// function createData(id: number, name: string, amount: number, dated: Date) {
//   return { id, name, amount, dated };
// }

// const bills = [
//   createData(1, "Stacks & Racks", 2000, new Date()),
//   createData(2, "Starbucks", 2000, new Date()),
//   createData(3, "Barista", 2000, new Date()),
// ];

export default function BillsPage() {
  const {
    bills,
    billTitle,
    billAmountPaid,
    users,
    items,
    taxes,
    saveBillData,
    setBillTitle,
    setBillAmountPaid,
  } = useBillContext();

  console.log("bills: ", bills);
  return (
    <>
      <div className="flex justify-between mb-16">
        <h1 className="text-3xl font-bold">Bills</h1>{" "}
        <Link
          href="/bills/0"
          className="border border-dark px-4 py-2 rounded-lg hover:bg-dark hover:text-light hover:shadow-lg transition-all font-bold"
        >
          + New Bill
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          className="shadow-inner"
          sx={{ tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow className="bg-gray text-light">
              <TableCell align="center" className="text-inherit font-bold">Bills</TableCell>
              <TableCell align="center" className="text-inherit font-bold">Amount</TableCell>
              <TableCell align="center" className="text-inherit font-bold">Date</TableCell>
              <TableCell align="center" className="text-inherit font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.length > 0 ? (
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
                    {bill.dated?.getDate()} / {bill.dated?.getMonth()} /{" "}
                    {bill.dated?.getFullYear()}
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      className="border border-solid rounded-md px-4 py-2 border-green text-green text-bold hover:bg-green/30"
                      href={`/bills/${bill.id}`}
                    >
                      <FontAwesomeIcon icon={faEye} /> View
                    </Link>
                    <IconButton aria-label="delete">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-inherit"
                      />
                    </IconButton>
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
