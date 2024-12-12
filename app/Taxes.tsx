"use client";
import React, { lazy, useRef, useEffect, useState, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons/faCheckCircle";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons/faXmarkCircle";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons/faTrashCan";
import { useBillContext } from "./BillContext";
import { TaxesProp } from "@/app/types";

export default function Users() {
  const { taxes, setTaxes, randomIdGenerator } = useBillContext();

  const [addTax, setAddTax] = useState<boolean>(false);

  const newTaxType = useRef<HTMLInputElement>("");
  const newTaxPercentage = useRef<HTMLInputElement>("");
  const [tax, setTax] = useState<number>(0);
  const taxRef = useRef(0);

  const addNewTax = useCallback(() => {
    if (
      newTaxType.current.value != "" &&
      newTaxPercentage.current.value != ""
    ) {
      setTaxes((prevItems) => {
        const current: TaxesProp = {
          id: randomIdGenerator(),
          taxType: newTaxType.current.value,
          taxPercentage: Number(newTaxPercentage.current.value),
        };
        return [...prevItems, current];
      });
      newTaxType.current.value = "";
      newTaxPercentage.current.value = "";
      setAddTax(!addTax);
    }
  }, [
    taxes,
    setTaxes,
    addTax,
    setAddTax,
    newTaxType.current,
    newTaxPercentage.current,
  ]);

  const deleteTax = useCallback(
    (deleteItemId: number) => {
      if (taxes.length > 0) {
        setTaxes((prevTaxes) =>
          prevTaxes.filter((tax) => tax.id != deleteItemId)
        );
      }
    },
    [taxes, setTaxes]
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          className="shadow-inner border border-light"
          sx={{ tableLayout: "fixed" }}
        >
          <TableHead className="bg-gray rounded-t-md">
            <TableRow className="text-bold text-light">
              <TableCell
                align="center"
                sx={{ fontWeight: 700 }}
                className="text-inherit"
              >
                Tax Type
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 700 }}
                className="text-inherit"
              >
                Tax Percentage
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 700 }}
                className="text-inherit"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxes.map((item) => (
              <TableRow
                key={item.taxType}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {item.taxType}
                </TableCell>
                <TableCell align="center">{item.taxPercentage}%</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteTax(item.id)}
                    className="hover:bg-red/30"
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-inherit"
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow classes={""}>
              {addTax && (
                <>
                  <TableCell align="center" className="flex gap-2">
                    <input
                      id="tax-type"
                      placeholder="Tax Type"
                      ref={newTaxType}
                      className="size-full border rounded-md p-2"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      id="tax-percentage"
                      placeholder="Tax Percentage"
                      ref={newTaxPercentage}
                      className="size-full border rounded-md p-2"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-evenly">
                      <IconButton aria-label="accept" onClick={addNewTax}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => {
                          newTaxType.current.value = "";
                          newTaxPercentage.current.value = "";
                          setAddTax(false);
                        }}>
                        <FontAwesomeIcon
                          icon={faXmarkCircle}
                          className="text-inherit"
                        />
                      </IconButton>
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
            <TableRow classes={""}>
              {!addTax && (
                <TableCell align="center" colSpan={3}>
                  <Button
                    className="w-full border border-dashed text-3xl"
                    variant="text"
                    onClick={() => setAddTax(!addTax)}
                  >
                    +
                  </Button>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}