"use client";
import React, { useState, MouseEvent, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons/faPenToSquare";

export default function Home() {
  return (
    <main>
      <div className="flex justify-between items-center bg-dark/80 p-4 rounded-lg">
        <Link
          href="/"
          className="flex items-center
        "
        >
          {/* <Avatar alt="Bill Distributor">BD</Avatar> */}
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
        </div>
      </div>
    </main>
  );
}
