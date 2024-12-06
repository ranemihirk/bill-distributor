import React, { lazy, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "./assets/imgs/rmklogo.png";
import Button from "@mui/material/Button";

type UsersProp = {
  id: number;
  name: string;
};

type ItemsProp = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type ItemsQuantityProp = {
  itemId: number;
  quantity: number;
};

type UserItemProp = {
  items: ItemsQuantityProp[];
};

type TaxProp = {
  taxType: string;
  taxPercentage: number;
};

type ItemsToUserProp = {
  users: UsersProp[];
  items: ItemsProp[];
  currentUser: UsersProp;
  currentItemsToUser: ItemsQuantityProp;
};

type CurrentItemsToUsers = {
  itemName: string;
  itemPrice: number;
  itemQuantity: number;
};

export default function ItemsToUsers({
  users,
  items,
  currentUser,
  currentItemsToUser,
}: ItemsToUserProp) {
  // console.log(
  //   "ItemsToUsers current: ",
  //   users,
  //   items,
  //   currentUser,
  //   currentItemsToUser
  // );
  const [currentItems, setCurrentItems] = useState<CurrentItemsToUsers[]>([]);

  useEffect(() => {
    let newOne: CurrentItemsToUsers[] = [];

    // currentItemsToUser.items.map((item) => {
    //   console.log("item: ", item);
    //   Array(item).forEach((current) => {
    //     const getItem = items.find((one) => one.id == current.itemId);
    //     if (getItem) {
    //       const two = {
    //         itemName: getItem?.name,
    //         itemPrice: getItem?.price,
    //         itemQuantity: current.quantity,
    //       };
    //       console.log("two: ", two);
    //       setCurrentItem((prevCurrentItem) => {
    //         const newPrevCurrentItem = [...prevCurrentItem, two];
    //         return newPrevCurrentItem;
    //       });
    //     }
    //   });
    // });

    // const test = currentItemsToUser.map((currentItem) => {
    const newTest = items.find(
      (item) => item.id === currentItemsToUser?.itemId
    );
    if (newTest && newTest != null) {
      const newResult: CurrentItemsToUsers = {
        itemName: newTest?.name,
        itemPrice: newTest?.price,
        itemQuantity: currentItemsToUser?.quantity,
      };
      // setCurrentItems((prevCurrentItems) => {
      //   const newCurrentItems = [...prevCurrentItems, newResult];
      //   return newCurrentItems;
      // });
    }

    // console.log("newTest: ", newTest);
    // });
    // console.log("test: ", test);

    return () => {
      setCurrentItems([]);
    };
  }, []);

  useEffect(() => {
    // console.log("currentItems: ", currentItems);
  }, [currentItems]);

  return (
    <>
      {currentItems.length > 0 &&
        currentItems.map((item) => (
          <tr>
            <td className="border w-1/2">{item.itemName}</td>
            <td className="border">{item.itemPrice}</td>
            <td className="border">{item.itemQuantity}</td>
            <td className="border">{item.itemPrice * item.itemQuantity}</td>
          </tr>
        ))}
    </>
  );
}
