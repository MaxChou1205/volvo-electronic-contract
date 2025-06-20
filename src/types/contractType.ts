import type { OrderDetail } from "./orderType";

export type Contract = {
  order: OrderDetail;
  contractNo: string;
  pdfUrl: string;
  email: string;
  contractDate: Date | null;
  payModeName: string;
  loanRate: number;
  interestSubsidy: number;
  cashCheckNo: string;
  cc: string;
  powerSystem: string;
  factoryYear: string | null;
  origin: string;
  isSpecific: boolean | null;
  door: number;
  seat: number;
  sunroof: string | null;
  gearShift: string;
  transmission: string;
  scheduledLicenseDate: Date | null;
  isImported: boolean | null;
  deliveryLocation: number | null;
  showroom: string;
  deliveryCityId: number | null;
  deliveryCityName: string;
  deliveryDistrictId: number | null;
  deliveryDistrictName: string;
  deliveryAddress: string;
  customerSignatureBase64: string | null;
  consultantSignatureBase64: string | null;
};

export type ApiContractListItem = {
  contractNo: string;
  contractStatus: number;
  customerName: string;
  modelName: string;
};
