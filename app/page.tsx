"use client";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { test } from "@/lib/redis";

export default function Home() {
  const { init } = useAuthContext();

  const testNew = async () => {
    const result = await test();
    console.log("result: ", result);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <button onClick={testNew}>Test</button>
    </div>
  );
}
