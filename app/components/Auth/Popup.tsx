"use client";
import React, { useState, Dispatch, SetStateAction } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons/faXmarkCircle";

import { useBillContext } from "@/contexts/BillContext";
import Register from "@/components/Auth/Register";
import Login from "@/components/Auth/Login";

type PopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function PopupPage({
  open,
  setOpen,
}: PopupProps) {
  const { isLargeScreen } = useBillContext();

  const [type, setType] = useState("login");

  const handleClose = () => {
    setOpen(false);
  };

  const handlePopupTypeChange = (newType) => {
    setType(newType);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogActions>
          <Button
            onClick={handleClose}
            className="min-w-fit border text-lg lg:text-xl text-dark rounded-full font-bold"
          >
            <FontAwesomeIcon icon={faXmarkCircle} className="text-inherit" />
          </Button>
        </DialogActions>
        <DialogTitle className="text-center capitalize">{type}</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-center hidden">
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          {type == "login" ? (
            <Login handlePopupTypeChange={handlePopupTypeChange} setOpen={setOpen} />
          ) : (
            <Register handlePopupTypeChange={handlePopupTypeChange} setOpen={setOpen} />
          )}
        </DialogContent>
        {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions> */}
      </Dialog>
    </div>
  );
}
