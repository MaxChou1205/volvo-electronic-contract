import { carApi } from "@/api/carApi";
import { OrderDetail } from "@/types/orderType";

export const useCarService = () => {
  const getCarList = async () => {
    const response = await carApi.getCarList();
    return response;
  };

  const getYearOptions = async (form: Partial<OrderDetail>) => {
    if (!form.modelId) return;
    const response = await carApi.getCarYears(form.modelId);
    return response.map((item) => ({
      value: item.modelYearId,
      code: item.modelYearCode,
      label: item.modelYearName,
    }));
  };

  const getConfigOptions = async (form: Partial<OrderDetail>) => {
    if (!form.modelId || !form.modelYearId) return;
    const response = await carApi.getCarConfigs(form.modelId, form.modelYearId);
    return response.map((item) => ({
      value: item.modelConfigId,
      code: item.modelConfigCode,
      label: item.modelConfigName,
    }));
  };

  const getColorOptions = async (form: Partial<OrderDetail>) => {
    if (!form.modelYearCode || !form.modelConfigCode) return;
    const response = await carApi.getCarColors(
      form.modelYearCode,
      form.modelConfigCode,
    );
    return response.map((item) => ({
      value: item.modelColorId,
      code: item.modelColorCode,
      label: item.modelColorName,
    }));
  };

  const getTrimOptions = async (form: Partial<OrderDetail>) => {
    if (!form.modelYearCode || !form.modelConfigCode || !form.modelColorCode)
      return;
    const response = await carApi.getCarTrims(
      form.modelYearCode,
      form.modelConfigCode,
      form.modelColorCode,
    );
    return response.map((item) => ({
      value: item.modelTrimId,
      code: item.modelTrimCode,
      label: item.modelTrimName,
    }));
  };

  const getOptionOptions = async (form: Partial<OrderDetail>) => {
    if (
      !form.modelYearCode ||
      !form.modelConfigCode ||
      !form.modelColorCode ||
      !form.modelTrimCode
    )
      return;
    const response = await carApi.getCarOptions(
      form.modelYearCode,
      form.modelConfigCode,
      form.modelColorCode,
      form.modelTrimCode,
    );
    return response.map((item) => ({
      value: item.modelOptionName,
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
