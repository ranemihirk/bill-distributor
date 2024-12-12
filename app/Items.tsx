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
import { ItemsProps } from "./types";

export default function Users() {
  const { items, setItems, randomIdGenerator } = useBillContext();

  const [addItem, setAddItem] = useState<boolean>(false);

  const newItem = useRef<HTMLInputElement>(null);
  const newRate = useRef<HTMLInputElement>(null);
  const newQuantity = useRef<HTMLInputElement>(null);

  const addNewItem = useCallback(() => {
    if (newItem.current && newRate.current && newQuantity.current) {
      if (
        newItem.current.value != "" &&
        newRate.current.value != "" &&
        newQuantity.current.value != ""
      ) {
        setItems((prevItems) => {
          if (newItem.current && newRate.current && newQuantity.current) {
            const current: ItemsProps = {
              id: randomIdGenerator(),
              name: newItem.current.value,
              rate: Number(newRate.current.value),
              quantity: Number(newQuantity.current.value),
            };
            return [...prevItems, current];
          } else {
            return [...prevItems];
          }
        });
        resetToDefault();
      }
    }
  }, [
    items,
    setItems,
    newItem.current,
    newRate.current,
    newQuantity.current,
    resetToDefault,
    randomIdGenerator,
  ]);
  const deleteItem = useCallback(
    (deleteItemId: number) => {
      if (items.length > 0) {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id != deleteItemId)
        );
      }
    },
    [items, setItems]
  );
  function resetToDefault() {
    setAddItem(false);
    if (newItem.current && newRate.current && newQuantity.current) {
      newItem.current.value = "";
      newRate.current.value = "";
      newQuantity.current.value = "";
    }
  }

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
                  <TableCell align="center" colSpan={1}>
                    0
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-evenly">
                      <IconButton aria-label="accept" onClick={addNewItem}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={resetToDefault}>
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
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
