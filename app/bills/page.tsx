import React from "react";
export const dynamic = "force-dynamic";
import BillsListPage from "./billsList";

export default async function BillsPage() {
  // const data = await fetchAPI();

  // const { result } = await fetchRedisAPI();
  // console.log("result: ", result);

  // setTimeout(async () => {
  // const { result: newResult } = await fetchGetFromRedisAPI();
  // console.log("newResult: ", newResult);
  // }, 2000);

  return <BillsListPage data={null} />; // <BillsListPage data={data.bills} />;
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

const fetchRedisAPI = async () => {
  const apiCallPath = `${process.env.HOST_URL}/api/connectToRedis`;
  let res = await fetch(apiCallPath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();

  return { result };
};

const fetchGetFromRedisAPI = async () => {
  const apiCallPath = `${process.env.HOST_URL}/api/fetchToRedis`;
  let res = await fetch(apiCallPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();

  return { result };
};
