import React, { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "./assets/imgs/rmklogo.png";
import { Outlet } from "react-router";

export default function Layout() {
    const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <main>
      <Outlet context={{ isLargeScreen }} />
    </main>
  );
}
