import { useState, useEffect } from "react";
// import { useBillContext } from "@/app/BillContext";
import BillDataPage from "./BillComponent";

export async function generateMetadata({
  params,
}: {
  params: { bill_id: string };
}) {
  // const { fetchBillData } = useBillContext();

  const currentBillData = null; // fetchBillData(Number(params.bill_id));

  return {
    title: "New Bill",
  };
}

export default async function BillPage({
  params,
}: {
  params: { bill_id: string };
}) {
  const { bill_id } = await params;

  return <BillDataPage bill_id={bill_id} />;
}
