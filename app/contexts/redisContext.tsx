"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Redis } from "@upstash/redis";

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });
const redis = Redis.fromEnv();

type DataContextProviderProps = {
  children: ReactNode;
};

type DataContextProp = {
  data: Array<any>;
  setData: Dispatch<SetStateAction<Array<any>>>;
};

export const DataContext = createContext<DataContextProp | null>(null);

export default function DataContextProvider({
  children,
}: DataContextProviderProps) {
  const [data, setData] = useState<Array<any>>([]);

  // const { result } = await fetchRedisAPI();

  //   async function demo() {
  //     try {
  //       const data = await redis.get("key");
  //       console.log(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const count = await redis.incr("counter");
        // console.log("count: ", count);
        console.log("redis:", redis);
        await redis.set("foo", "bar");
        let x = await redis.get("foo");
        console.log(x);
        // const data = await redis.get("key");
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      "useBillContext must be called within a BillContextProvider"
    );
  }
  return context;
}
