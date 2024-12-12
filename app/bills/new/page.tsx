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

type MainBillProps = {
  id: number;
  name: string;
  rate: number;
  quantity: number;
};

type TaxProp = {
  id: number;
  taxType: string;
  taxPercentage: number;
};

export default function NewBillPage() {
  // const [addItem, setAddItem] = useState<boolean>(false);
  // const [items, setItems] = useState<MainBillProps[]>([]);

  // const [addTax, setAddTax] = useState<boolean>(false);
  // const [taxes, setTaxes] = useState<TaxProp[]>([]);

  // const newItem = useRef<HTMLInputElement>("");
  // const newRate = useRef<HTMLInputElement>("");
  // const newQuantity = useRef<HTMLInputElement>("");

  // const newTaxType = useRef<HTMLInputElement>("");
  // const newTaxPercentage = useRef<HTMLInputElement>("");

  // const [subTotal, setSubTotal] = useState<number>(0);
  // const subTotalRef = useRef(0);

  // const [tax, setTax] = useState<number>(0);
  // const taxRef = useRef(0);

  // function randomIdGenerator() {
  //   return Math.floor(Math.random() * 1000000) + 1;
  // }

  // const addNewItem = useCallback(() => {
  //   if (
  //     newItem.current.value != "" &&
  //     newRate.current.value != "" &&
  //     newQuantity.current.value != ""
  //   ) {
  //     setItems((prevItems) => {
  //       const current: MainBillProps = {
  //         id: randomIdGenerator(),
  //         name: newItem.current.value,
  //         rate: Number(newRate.current.value),
  //         quantity: Number(newQuantity.current.value),
  //       };
  //       return [...prevItems, current];
  //     });
  //     resetToDefault();
  //   }
  // }, [
  //   items,
  //   setItems,
  //   newItem.current,
  //   newRate.current,
  //   newQuantity.current,
  //   resetToDefault,
  //   randomIdGenerator,
  // ]);

  // const calculateSubTotal = useCallback(() => {
  //   items.map((item) => {
  //     subTotalRef.current = subTotalRef.current + item.rate * item.quantity;
  //   });
  //   setSubTotal(subTotalRef.current);
  // }, [items, setSubTotal]);

  // const addNewTax = useCallback(() => {
  //   if (
  //     newTaxType.current.value != "" &&
  //     newTaxPercentage.current.value != ""
  //   ) {
  //     setTaxes((prevItems) => {
  //       const current: TaxProp = {
  //         id: randomIdGenerator(),
  //         taxType: newTaxType.current.value,
  //         taxPercentage: Number(newTaxPercentage.current.value),
  //       };
  //       return [...prevItems, current];
  //     });
  //     newTaxType.current.value = "";
  //     newTaxPercentage.current.value = "";
  //     setAddTax(!addTax);
  //   }
  // }, [
  //   taxes,
  //   setTaxes,
  //   addTax,
  //   setAddTax,
  //   newTaxType.current,
  //   newTaxPercentage.current,
  // ]);

  // const deleteItem = useCallback(
  //   (deleteItemId: number) => {
  //     if (items.length > 0) {
  //       setTaxes((prevItems) =>
  //         prevItems.filter((item) => item.id != deleteItemId)
  //       );
  //     }
  //   },
  //   [items, setItems]
  // );

  // const deleteTax = useCallback(
  //   (deleteItemId: number) => {
  //     if (taxes.length > 0) {
  //       setTaxes((prevTaxes) =>
  //         prevTaxes.filter((tax) => tax.id != deleteItemId)
  //       );
  //     }
  //   },
  //   [taxes, setTaxes]
  // );

  // function resetToDefault() {
  //   setAddItem(false);
  //   setAddTax(false);
  //   newItem.current.value = "";
  //   newRate.current.value = "";
  //   newQuantity.current.value = "";
  //   newTaxType.current.value = "";
  //   newTaxPercentage.current.value = "";
  // }

  // useEffect(() => {
  //   if (items.length > 0) {
  //     calculateSubTotal();
  //   }
  // }, [items]);

  // useEffect(() => {
  //   if (subTotal != 0 && taxes.length > 0) {
  //     taxes.map((tax) => {
  //       taxRef.current = taxRef.current + tax.taxPercentage;
  //     });
  //     setTax(taxRef.current);
  //   }
  // }, [taxes, subTotal]);

  return (
    <>
    <div></div>
      {/* <h1 className="text-center text-bold text-3xl py-8 bg-dark text-light rounded-lg">
        New Bill
      </h1>

      {/* Add Items 
      <div className="mt-8">
        <h3 className="text-bold text-center text-2xl">Add Items</h3>
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
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.rate}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">
                    {item.rate * item.quantity}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteItem(item.id)}
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
                {addItem && (
                  <>
                    <TableCell align="center">
                      <input
                        id="new-item"
                        placeholder="Item"
                        ref={newItem}
                        className="size-full border rounded-md p-2"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <input
                        id="new-rate"
                        placeholder="Rate"
                        ref={newRate}
                        className="size-full border rounded-md p-2"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <input
                        id="new-quantity"
                        placeholder="Quantity"
                        ref={newQuantity}
                        className="size-full border rounded-md p-2"
                      />
                    </TableCell>
                    <TableCell align="center" colSpan={1}></TableCell>
                    <TableCell align="center">
                      <div className="flex justify-evenly">
                        <IconButton aria-label="accept" onClick={addNewItem}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={resetToDefault}
                        >
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
                {!addItem && (
                  <TableCell align="center" colSpan={5}>
                    <Button
                      className="w-full border border-dashed text-3xl"
                      variant="text"
                      onClick={() => setAddItem(!addItem)}
                    >
                      +
                    </Button>
                  </TableCell>
                )}
              </TableRow>
              {items.length > 0 && (
                <TableRow classes={""}>
                  <TableCell
                    align="center"
                    colSpan={1}
                    sx={{ fontWeight: 700, fontSize: 24 }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{
                      fontWeight: 700,
                      fontSize: tax == 0 ? 24 : "inherit",
                    }}
                  >
                    Sub Total
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{
                      fontWeight: 700,
                      fontSize: tax == 0 ? 24 : "inherit",
                    }}
                  >
                    {subTotal}
                  </TableCell>
                </TableRow>
              )}
              {taxes.length > 0 &&
                taxes.map((current) => (
                  <TableRow classes={""}>
                    <TableCell
                      align="center"
                      colSpan={1}
                      sx={{ fontWeight: 700, fontSize: 24 }}
                    ></TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      sx={{ fontWeight: 700 }}
                    >
                      {current.taxType}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      sx={{ fontWeight: 700 }}
                    >
                      {current.taxPercentage}%
                    </TableCell>
                  </TableRow>
                ))}
              {items.length > 0 && taxes.length > 0 && (
                <TableRow classes={""}>
                  <TableCell
                    align="center"
                    colSpan={1}
                    sx={{ fontWeight: 700, fontSize: 24 }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{ fontWeight: 700, fontSize: 24 }}
                  >
                    Bill Total
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{ fontWeight: 700, fontSize: 24 }}
                  >
                    {subTotal + (subTotal * tax) / 100}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Add Taxes 
      <div className="mt-8">
        <h3 className="text-bold text-center text-2xl">Add Taxes</h3>
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
                        <IconButton
                          aria-label="delete"
                          onClick={resetToDefault}
                        >
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
                      onClick={() => setAddTax(!addItem)}
                    >
                      +
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div> */}
    </>
  );
}
