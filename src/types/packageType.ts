export interface PackageInfo {
  id: number;
  packageName: string;
  image: string | null;
  imageUrl: string | null;
  modelId: number;
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
  packageDmsOptions: {
    optionId: string;
    optionCode: string;
    optionName: string;
    optionPrice: number;
    value: string;
    label: string;
    code: string;
  }[];
  packageOptions: {
    name: string;
    price: number;
  }[];
}

export interface PackageInfoPostReq
  extends Omit<PackageInfo, "packageOptions"> {
  packageOptions: {
    optionId: string;
    optionCode: string;
    optionName: string;
    optionPrice: number;
  }[];
}

export interface PackageInfoGetRes
  extends Omit<PackageInfo, "packageDmsOptions" | "packageOptions"> {
  imageUrl: string;
  packageDmsOptions: {
    optionId: string;
    optionCode: string;
    optionName: string;
    optionPrice: number;
  }[];
  packageOptions: {
    name: string;
    price: number;
  }[];
}

export interface PackageListGetRes {
  items: [
    {
      id: number;
      imageUrl: string | null;
      thumbnailUrl: string | null;
      packageName: string;
      modelId: number;
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
      modelTrimId: string;
      modelTrimCode: string;
      modelTrimName: string;
      vehicleRetailAllAmount: number;
      vehicleDealAllAmount: number;
      packageDmsOptions: [];
      packageOptions: [];
      createdAt: Date;
      createdBy: string;
      modifiedAt: Date;
      modifiedBy: string;
    },
  ];
  totalCount: number;
  totalPage: number;
}
