export type MainBillProps = {
  id: number;
  name: string;
  amount: number;
  date: Date;
  amountPaid: number;
  items: ItemsProps[];
  taxes: TaxProp[];
  users: UsersProp[];
  userToItems: UserToItemsProp[];
  extraFee: ExtraFeeProp[];
};

export type UsersProp = {
  id: number;
  name: string;
};

export type ItemsProps = {
  id: number;
  name: string;
  rate: number;
  quantity: number;
};

export type UserToItemsProp = {
  userId: number;
  items: UserToItemsQuantityProp[];
};

export type UserToItemsQuantityProp = {
  itemId: number;
  quantity: number;
};

export type TaxesProp = {
  id: number;
  taxType: string;
  taxPercentage: number;
};

export type ExtraFeeProp = {
  id: number;
  feeType: string;
  feeAmount: number;
};