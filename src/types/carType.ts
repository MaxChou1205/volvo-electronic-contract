export type CarFormRequest = {
  carId: string;
  year: string;
  config: string;
  color: string;
  trim: string;
  option: string[];
  area: string;
  areaCode: string;
  district: string;
  address: string;
  exhibitionCenter: string;
};

export type CarList = {
  modelId: string;
  modelCode: string;
  modelName: string;
};

export type CarYear = {
  modelYearId: string;
  modelYearCode: string;
  modelYearName: string;
};

export type CarConfig = {
  modelConfigId: string;
  modelConfigCode: string;
  modelConfigName: string;
  price: number;
};

export type CarColor = {
  modelColorId: number;
  modelColorCode: string;
  modelColorName: string;
};

export type CarTrim = {
  modelTrimId: number;
  modelTrimCode: string;
  modelTrimName: string;
};

export type CarOption = {
  modelOptionId: number;
  modelOptionCode: string;
  modelOptionName: string;
  price: number;
};
