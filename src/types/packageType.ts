export interface PackageInfo {
  packageName: string;
  modelId: string;
  modelCode: string;
  modelName: string;
  modelYearId: string;
  modelYearCode: string;
  modelYearName: string;
  modelConfigId: string;
  modelConfigCode: string;
  modelConfigName: string;
  modelColorId: string;
  modelColorCode: string;
  modelColorName: string;
  modelTrimId: string;
  modelTrimCode: string;
  modelTrimName: string;
  vehicleRetailAllAmount: number;
  vehicleDealAllAmount: number;
  packageOptions: {
    optionId: string;
    optionCode: string;
    optionName: string;
    optionPrice: number;
  }[];
}
