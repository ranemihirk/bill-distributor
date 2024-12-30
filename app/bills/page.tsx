import { useEffect } from "react";
import BillsListPage from "./billsList";

export async function generateMetadata() {
  return {
    title: "Bills",
  };
}

export default async function BillsPage() {
  const data = await fetchAPI();
  return <BillsListPage data={data} />;
}

const fetchAPI = async () => {
  let data = {
    type: "fetch-bills",
  };
  let a = await fetch("/api/fetchBillData", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let res = await a.json();
  console.log("res: ", typeof res.data, JSON.parse(res.data));

  // if (res.data) {
  const result = JSON.parse(res.data);
  // setBills(result.bills);
  // }
  return result.bills;
};
