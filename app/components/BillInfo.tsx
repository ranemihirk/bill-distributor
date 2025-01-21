"use client";
import React, { lazy, useRef, useEffect, useState } from "react";
import { useBillContext } from "@/contexts/BillContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BillInfoPage() {
  const { bills, users, items, taxes, calculateSubTotal, calculateBillTax } =
    useBillContext();

  const [subTotal, setSubTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

  const extraFee = 30;
  const billPaid = 662.5;

  useEffect(() => {
    if (items.length > 0) {
      const current = calculateSubTotal();
      setSubTotal(current);
    }
  }, [items]);

  useEffect(() => {
    if (subTotal != 0) {
      if (taxes.length > 0) {
        setTax(calculateBillTax());
      } else {
        setTax(0);
      }
    }
  }, [taxes, subTotal]);

  return (
    <>
      {items.length > 0 && (
        <TableContainer component={Paper} className="lg:rounded">
          <Table
            aria-label="simple table"
            className="shadow-inner border text-light bg-dark border-light"
            sx={{ tableLayout: "fixed" }}
          >
            <TableHead className="bg-light rounded-t-md">
              <TableRow className="text-bold text-dark border-x-4">
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700 }}
                  className="text-inherit"
                >
                  Items
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700 }}
                  className="text-inherit"
                >
                  Rate
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700 }}
                  className="text-inherit"
                >
                  Quantity
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700 }}
                  className="text-inherit"
                >
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  className="text-inherit"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    className="text-inherit"
                  >
                    {item.name}
                  </TableCell>
                  <TableCell align="center" className="text-inherit">
                    {item.rate}
                  </TableCell>
                  <TableCell align="center" className="text-inherit">
                    {item.quantity}
                  </TableCell>
                  <TableCell align="center" className="text-inherit">
                    {item.rate * item.quantity}
                  </TableCell>
                </TableRow>
              ))}

              {items.length > 0 && (
                <TableRow classes={""}>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{
                      fontWeight: 700,
                    }}
                    className={`text-inherit ${
                      tax == 0 && "text-xl lg:text-2xl"
                    }`}
                  >
                    Sub Total
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{
                      fontWeight: 700,
                    }}
                    className={`text-inherit ${
                      tax == 0 && "text-xl lg:text-2xl"
                    }`}
                  >
                    {subTotal}
                  </TableCell>
                </TableRow>
              )}
              {taxes.length > 0 &&
                taxes.map((current) => (
                  <TableRow classes={""} key={`taxes_${current.id}`}>
                    <TableCell
                      align="center"
                      colSpan={2}
                      sx={{ fontWeight: 700 }}
                      className="text-inherit"
                    >
                      {current.taxType}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      sx={{ fontWeight: 700 }}
                      className="text-inherit"
                    >
                      {current.taxPercentage}%
                    </TableCell>
                  </TableRow>
                ))}
              {items.length > 0 && taxes.length > 0 && (
                <TableRow classes={""}>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{ fontWeight: 700 }}
                    className="text-inherit text-xl lg:text-2xl"
                  >
                    Bill Total
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{ fontWeight: 700 }}
                    className="text-inherit text-xl lg:text-2xl"
                  >
                    {subTotal + (subTotal * tax) / 100}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
