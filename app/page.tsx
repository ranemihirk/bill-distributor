"use client";
import React, { useState, MouseEvent, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons/faPowerOff";
import { faFileLines } from "@fortawesome/free-solid-svg-icons/faFileLines";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { useBillContext } from "@/contexts/BillContext";
import PopupPage from "@/components/Auth/Popup";
import { fetchBook, test } from "@/lib/redis";

export default function Home() {
  const { user, init, logoutUser } = useAuthContext();
  const { isLargeScreen } = useBillContext();

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("login");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const testNew = async () => {
    const result = await test();
    console.log("result: ", result);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <main>
      <div className="flex justify-between items-center bg-dark/80 p-4 rounded-lg">
        <Link
          href="/"
          className="flex items-center
        "
        >
          <Avatar
            alt="Bill Distributor"
            src="/assets/images/logo.png"
            className="border border-2 border-dark bg-light size-12 lg:size-16"
          />
          <h1 className="lg:text-2xl font-bold ml-4 text-light">
            Bill Distributor
          </h1>
        </Link>
        <div className="flex justify-end gap-2 flex-wrap">
          {isLargeScreen && (
            <>
              {" "}
              <Link
                href="/bills/new"
                className="border text-sm lg:text-lg border-light px-4 py-2 rounded-lg bg-dark/80 text-light hover:bg-light hover:text-dark hover:shadow hover:shadow-light transition-all font-bold"
              >
                Old Bill
              </Link>
              <Link
                href="/bills"
                className="border text-sm lg:text-lg border-light px-4 py-2 rounded-lg bg-dark/80 text-light hover:bg-light hover:text-dark hover:shadow hover:shadow-light transition-all font-bold"
              >
                Bill History
              </Link>
            </>
          )}
          <>
            {" "}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {!user ? (
                  <Avatar className="bg-dark/80" />
                ) : (
                  <Avatar className="capitalize bg-dark/80">
                    {user.name.charAt(0)}{" "}
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {user && (
                <>
                  <MenuItem
                    onClick={handleClose}
                    className={`${!user && "hidden"}`}
                  >
                    <Avatar className="bg-dark/80" /> Profile
                  </MenuItem>
                  <Divider />
                </>
              )}

              {!isLargeScreen && (
                <>
                  <MenuItem>
                    <Link
                      className="flex items-center justify-evenly"
                      href="/bills/new"
                    >
                      <ListItemIcon className="bg-dark/80 min-w-fit p-2 text-light rounded-full mr-2">
                        <FontAwesomeIcon
                          className="text-lg aspect-square"
                          icon={faFileLines}
                        />
                      </ListItemIcon>
                      Old Bill
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      className="flex items-center justify-evenly"
                      href="/bills"
                    >
                      <ListItemIcon className="bg-dark/80 min-w-fit p-2 text-light rounded-full mr-2">
                        <FontAwesomeIcon
                          className="text-lg aspect-square"
                          icon={faFileLines}
                        />
                      </ListItemIcon>
                      Bill History
                    </Link>
                  </MenuItem>
                  <Divider />
                </>
              )}

              <MenuItem
                onClick={handleClickOpen}
                className={`${user && "hidden"}`}
              >
                <Avatar className="bg-dark/80" />
                Sign In
              </MenuItem>
              <MenuItem onClick={logoutUser} className={`${!user && "hidden"}`}>
                <ListItemIcon className="bg-dark/80 min-w-fit p-2 text-light rounded-full mr-2">
                  <FontAwesomeIcon icon={faPowerOff} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        </div>
      </div>
      <button onClick={testNew}>Test</button>
      <PopupPage open={open} setOpen={setOpen} type={type} setType={setType} />
    </main>
  );
}
