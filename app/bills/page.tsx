import { useEffect } from "react";
import BillsListPage from "./billsList";

export async function generateMetadata() {
  return {
    title: "Bills",
  };
}

export default async function BillsPage() {
  const data = await fetchAPI();
  return <BillsListPage data={data.bills} res={data.res} path={data.path} />;
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
