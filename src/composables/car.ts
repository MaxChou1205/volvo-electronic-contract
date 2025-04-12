import { carApi } from "@/api/carApi";
import { ApiOrderDetail } from "@/types/orderType";

export const useCar = () => {
  const getCarList = async () => {
    const response = await carApi.getCarList();
    return response;
  };

  const getYearOptions = async (form: Partial<ApiOrderDetail>) => {
    if (!form.modelId) return;
    const response = await carApi.getCarYears(form.modelId);
    return response.map((item) => ({
      value: item.modelYearCode,
      label: item.modelYearName,
    }));
  };

  const getConfigOptions = async (form: Partial<ApiOrderDetail>) => {
    if (!form.modelId || !form.modelYearId) return;
    const response = await carApi.getCarConfigs(form.modelId, form.modelYearId);
    return response.map((item) => ({
      value: item.modelConfigCode,
      label: item.modelConfigName,
    }));
  };

  const getColorOptions = async (form: Partial<ApiOrderDetail>) => {
    if (!form.modelYearId || !form.modelConfigId) return;
    const response = await carApi.getCarColors(
      form.modelYearId,
      form.modelConfigId,
    );
    return response.map((item) => ({
      value: item.modelColorCode,
      label: item.modelColorName,
    }));
  };

  const getTrimOptions = async (form: Partial<ApiOrderDetail>) => {
    if (!form.modelYearId || !form.modelConfigId || !form.modelColorId) return;
    const response = await carApi.getCarTrims(
      form.modelYearId,
      form.modelConfigId,
      form.modelColorId,
    );
    return response.map((item) => ({
      value: item.modelTrimCode,
      label: item.modelTrimName,
    }));
  };

  const getOptionOptions = async (form: Partial<ApiOrderDetail>) => {
    if (
      !form.modelYearId ||
      !form.modelConfigId ||
      !form.modelColorId ||
      !form.modelTrimId
    )
      return;
    const response = await carApi.getCarOptions(
      form.modelYearId,
      form.modelConfigId,
      form.modelColorId,
      form.modelTrimId,
    );
    return response.map((item) => ({
      value: item.modelOptionCode,
      label: item.modelOptionName,
    }));
  };

  return {
    getCarList,
    getYearOptions,
    getConfigOptions,
    getColorOptions,
    getTrimOptions,
    getOptionOptions,
  };
};
