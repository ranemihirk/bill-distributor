import React, { lazy, useCallback, useEffect, useState } from "react";

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
  userId: number;
  items: ItemsQuantityProp[];
};

type TaxProp = {
  taxType: string;
  taxPercentage: number;
};

type BillToUserInfoProp = {
  users: UsersProp[] | null;
  items: ItemsProp[] | null;
  itemsToUser: UserItemProp[] | null;
  extraFee: number;
  billPaid: number;
  billTotal: number;
};

type CurrentItemsToUsers = {
  itemName: string;
  itemPrice: number;
  itemQuantity: number;
};

type CurrentItemsToUsersProp = {
  user: UsersProp | null;
  items: CurrentItemsToUsers[];
};

const defaultUser = {
  id: 1,
  name: "Mihir",
};

export default function BillToUserInfo({
  users,
  items,
  itemsToUser,
  extraFee,
  billPaid,
  billTotal,
}: BillToUserInfoProp) {
  const [currentItemsToUser, setCurrentItemsToUser] = useState<
    CurrentItemsToUsersProp[]
  >([]);

  const getCurrentUser = useCallback(
    (userId: number) => {
      if (users) {
        return users.find((user) => user.id == userId);
      }
    },
    [users]
  );

  const getCurrentUserTotal = (currentItems: CurrentItemsToUsers[]) => {
    let billTotal: number = 0;

    currentItems.map((item) => {
      billTotal = billTotal + item.itemPrice * item.itemQuantity;
    });
    return billTotal + (billTotal * 5) / 100;
  };

  useEffect(() => {
    if (itemsToUser && itemsToUser.length > 0) {
      itemsToUser.map((itemsUser) => {
        const currentUser: UsersProp =
          getCurrentUser(itemsUser.userId) ?? defaultUser;
        const currentUserToItems: CurrentItemsToUsers[] = [];
        if (itemsUser.items && itemsUser.items.length > 0) {
          itemsUser.items.map((current) => {
            const newTest = items?.find((item) => item.id === current.itemId);
            if (newTest && newTest != null) {
              const newResult: CurrentItemsToUsers = {
                itemName: newTest.name,
                itemPrice: newTest.price,
                itemQuantity: current.quantity,
              };
              currentUserToItems.push(newResult);
            }
          });
          setCurrentItemsToUser((prevCurrentItems) => {
            const newItemsToUser = {
              user: currentUser,
              items: currentUserToItems,
            };
            const newCurrentItems = [...prevCurrentItems, newItemsToUser];
            return newCurrentItems;
          });
        }
        // }
      });
    }

    return () => {
      setCurrentItemsToUser([]);
    };
  }, [itemsToUser]);

  useEffect(() => {
    console.log("currentItemsToUser: ", currentItemsToUser);
  }, [currentItemsToUser]);

  return (
    <table className="table-auto w-full text-center">
      <tr className="lg:text-3xl  bg-black text-white dark:bg-white dark:text-black">
        <th className="border">User</th>
        <th className="border">Order</th>
      </tr>

      {currentItemsToUser &&
        itemsToUser &&
        users &&
        items &&
        currentItemsToUser.length > 0 &&
        currentItemsToUser.map((current) => (
          <>
            <tr>
              <td className="border font-bold lg:text-xl">
                {current.user?.name}
              </td>
              <td className="border">
                <table className="w-full" id={`table_${current.user?.name}`}>
                  <tr className=" bg-black text-white dark:bg-white dark:text-black">
                    <th className="border">Item</th>
                    <th className="border">Rate</th>
                    <th className="border">Quantity</th>
                    <th className="border">Amount</th>
                  </tr>
                  {current.items.map((item, key) => (
                    <>
                      <tr key={"item_" + key}>
                        <td className="border">{item.itemName}</td>
                        <td className="border">{item.itemPrice}</td>
                        <td className="border">{item.itemQuantity}</td>
                        <td className="border">
                          {item.itemPrice * item.itemQuantity}
                        </td>
                      </tr>
                    </>
                  ))}
                  <tr className="lg:text-xl">
                    <th className="border" colSpan={2}>
                      Convinience Fee
                    </th>
                    <th className="border" colSpan={2}>
                      {extraFee / currentItemsToUser.length}
                    </th>
                  </tr>
                  <tr className="lg:text-xl">
                    <th className="border" colSpan={2}>
                      Bill Amount
                    </th>
                    <th className="border" colSpan={2}>
                      {getCurrentUserTotal(current.items)}
                    </th>
                  </tr>
                  <tr className="lg:text-xl">
                    <th className="border" colSpan={2}>
                      Discounted Bill Amount
                    </th>
                    <th className="border" colSpan={2}>
                      {Math.round(
                        (getCurrentUserTotal(current.items) *
                          Math.round(
                            ((billPaid - extraFee) / billTotal) * 100
                          )) /
                          100
                      ) +
                        extraFee / currentItemsToUser.length}{" "}
                      - {Math.round(((billPaid - extraFee) / billTotal) * 100)}{" "}
                      %
                    </th>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="h-4"></tr>
          </>
        ))}
    </table>
  );
}
