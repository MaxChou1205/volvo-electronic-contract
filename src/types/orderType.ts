export type ApiOrderListItem = {
  orderNo: string;
  customerName: string;
  gender: number;
};

export type OrderListItem = ApiOrderListItem & {
  genderLabel: string;
};

export type ApiOrderDetail = {
  customerType: number;
  customerName: string;
  customerSurnames: string | null;
  customerTel: string;
  customerCtCode: number;
  customerCertificateNo: string;
  gender: number;
  cityId: string;
  cityName: string;
  districtId: string;
  districtName: string;
  customerAddress: string;
  drawerName: string;
  drawerSurnames: string | null;
  drawerTel: string;
  drawerCtCode: number;
  drawerCertificateNo: string;
  drawerAddress: string | null;
  consultantId: string;
  consultant: string;
  contractNo: string | null;
  orderType: string;
  orderNo: string;
  orderStatus: number;
  deliveringDate: string;
  activityName: string | null;
  modelId: string;
  modelCode: string;
  modelName: string;
  modelYearId: string;
  modelYearCode: string | null;
  modelYearName: string;
  modelConfigId: string | null;
  modelConfigCode: string;
  modelConfigName: string | null;
  modelColorId: string;
  modelColorCode: string;
  modelColorName: string;
  modelTrimId: string;
  modelTrimCode: string;
  modelTrimName: string;
  modelOptionNames: string;
  isChargingPile: boolean;
  salesUnitPrice: number;
  orderAllAmount: number;
  vehicleRetailAllAmount: number;
  vin: string | null;
  contractEarnest: number;
  depositPayWay: number;
  depositsUrls: {
    name: string;
    url: string;
  }[];
  payMode: number;
  initialPayment: number | null;
  loanAmounts: number | null;
  loanTerm: number | null;
  isCashCheck: boolean;
  checkPayerName: string | null;
  checkDate: string | null;
  paymentBankName: string | null;
  transferBankName: string | null;
  lastFiveBankAccount: string | null;
  urls: {
    name: string;
    url: string;
  }[];
  remark: string;
};

export type OrderDetail = Omit<
  ApiOrderDetail,
  "deliveringDate" | "checkDate" | "modelOptionNames"
> & {
  modelOptionNames: string[];
  deliveringDate: Date;
  checkDate: Date | null;
};

export type OrderDetailView = OrderDetail & {
  customerTypeLabel?: string;
  deliveringDateLabel?: string;
  isChargingPileLabel?: string;
  isCashCheckLabel?: string;
  checkDateLabel?: string;
  payModeLabel?: string;
  loanTermLabel?: string;
  depositPayWayLabel?: string;
};
