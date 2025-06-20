import type { TheFile } from "./fileType";

export type CompanyInfo = {
  id: number;
  code: string;
  name: string;
  ownerName: string;
  taxId: string;
  phone: string;
  address: string;
  largeSealUrl: string;
  largeSeal: TheFile | null;
  smallSealUrl: string;
  smallSeal: TheFile | null;
  agreementUrl: string;
  agreement: TheFile | null;
  nonDisclosureAgreementUrl: string;
  nonDisclosureAgreement: TheFile | null;
  membershipTermsUrl: string;
  membershipTerms: TheFile | null;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
};
