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

type UsersProp = {
  id: number;
  name: string;
};

export default function Users() {
  const { users, setUsers, randomIdGenerator } = useBillContext();

  const [addUser, setAddUser] = useState<boolean>(false);

  const newUser = useRef<HTMLInputElement>("");

  const addNewUser = useCallback(() => {
    if (newUser.current.value != "") {
      setUsers((prevUsers) => {
        const current: UsersProp = {
          id: randomIdGenerator(),
          name: newUser.current.value,
        };
        return [...prevUsers, current];
      });
      newUser.current.value = "";
      setAddUser(false);
    }
  }, [users, setUsers, newUser.current, setAddUser, randomIdGenerator]);

  const deleteUser = useCallback(
    (deleteUserId: number) => {
      if (users.length > 0) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id != deleteUserId)
        );
      }
    },
    [users, setUsers]
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
                Users
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
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {user.name}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteUser(user.id)}
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
              {addUser && (
                <>
                  <TableCell align="center" className="flex gap-2">
                    <input
                      id="user-name"
                      placeholder="User Name"
                      ref={newUser}
                      className="size-full border rounded-md p-2"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-evenly">
                      <IconButton aria-label="accept" onClick={addNewUser}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          newUser.current.value = "";
                          setAddUser(false);
                        }}
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
              {!addUser && (
                <TableCell align="center" colSpan={2}>
                  <Button
                    className="w-full border border-dashed text-3xl"
                    variant="text"
                    onClick={() => setAddUser(!addUser)}
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
