"use client";
import React, { lazy, useRef, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";

function createData(id: number, name: string, amount: number, dated: Date) {
  return { id, name, amount, dated };
}

const bills = [
  createData(1, "Stacks & Racks", 2000, new Date()),
  createData(2, "Starbucks", 2000, new Date()),
  createData(3, "Barista", 2000, new Date()),
];

export default function BillsPage() {
  return (
    <>
      <div className="flex justify-between mb-16">
        <h1>Bills</h1> <Link href="/bills/new">+ New Bill</Link>
      </div>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          className="shadow-inner"
          sx={{ tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow className="">
              <TableCell align="center">Bills</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow
                key={bill.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {bill.name}
                </TableCell>
                <TableCell align="center">{bill.amount}</TableCell>
                <TableCell align="center">
                  {bill.dated.getDate()} / {bill.dated.getMonth()} /{" "}
                  {bill.dated.getFullYear()}
                </TableCell>
                <TableCell align="center">
                  <Link
                    className="border border-solid rounded-md px-4 py-2 border-green text-green text-bold hover:bg-green/30"
                    href={`/bills/${bill.id}`}
                  >
                    <FontAwesomeIcon icon={faEye} /> View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
