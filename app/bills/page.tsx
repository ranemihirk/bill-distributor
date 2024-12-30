import React from "react";
export const dynamic = "force-dynamic";
import BillsListPage from "./billsList";

export default async function BillsPage() {
  const data = await fetchAPI();
  return <BillsListPage data={data.bills} />;
}

const fetchAPI = async () => {
  const apiCallPath = `${process.env.HOST_URL}/api/fetchBillData`;
  let res = await fetch(apiCallPath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();

  return { bills: result.bills };
};
