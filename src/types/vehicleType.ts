import { ApiPaginationResponse } from "./apiType";
import { TheFile } from "./fileType";

export interface VehicleInfo {
  id: number;
  imageUrl: string;
  image: TheFile | null;
  thumbnailUrl: string;
  thumbnail: TheFile | null;
  modelId: number | null;
  modelCode: string;
  modelName: string;
  category: string;
  isPublished: boolean;
  createdAt: string | Date;
  createdBy: string;
  modifiedAt: string | Date;
  modifiedBy: string;
  publishedDateStart: string;
  publishedDateEnd: string;
}

export interface VehicleInfoGetRes extends VehicleInfo {}

export interface VehicleListGetRes extends ApiPaginationResponse<VehicleInfo> {}
