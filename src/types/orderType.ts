export type ApiOrderListItem = {
  orderNo: string;
  customerName: string;
  gender: number;
};

export type OrderListItem = ApiOrderListItem & {
  genderLabel: string;
};
