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
  sunroof: string;
  gearShift: string;
  transmission: string;
  scheduledLicenseDate: string;
  isImported: boolean | null;
  deliveryLocation: number;
  showroom: string;
  deliveryCityId: number | null;
  deliveryCityName: string;
  deliveryDistrictId: number | null;
  deliveryDistrictName: string;
  deliveryAddress: string;
  customerSignature: File | null;
  consultantSignature: File | null;
};
