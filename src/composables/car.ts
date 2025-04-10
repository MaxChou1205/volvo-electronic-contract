import { carApi } from "@/api/carApi";
import type { CarFormRequest } from "@/types/carType";

export const useCar = () => {
  const getCarList = async () => {
    const response = await carApi.getCarList();
    return response;
  };

  const getYearOptions = async (form: Partial<CarFormRequest>) => {
    if (!form.carId) return;
    const response = await carApi.getCarYears(form.carId);
    return response.map((item) => ({
      value: item.modelYearCode,
      label: item.modelYearName,
    }));
  };

  const getConfigOptions = async (form: Partial<CarFormRequest>) => {
    if (!form.carId || !form.year) return;
    const response = await carApi.getCarConfigs(form.carId, form.year);
    return response.map((item) => ({
      value: item.modelConfigCode,
      label: item.modelConfigName,
    }));
  };

  const getColorOptions = async (form: Partial<CarFormRequest>) => {
    if (!form.year || !form.config) return;
    const response = await carApi.getCarColors(form.year, form.config);
    return response.map((item) => ({
      value: item.modelColorCode,
      label: item.modelColorName,
    }));
  };

  const getTrimOptions = async (form: Partial<CarFormRequest>) => {
    if (!form.year || !form.config || !form.color) return;
    const response = await carApi.getCarTrims(
      form.year,
      form.config,
      form.color,
    );
    return response.map((item) => ({
      value: item.modelTrimCode,
      label: item.modelTrimName,
    }));
  };

  const getOptionOptions = async (form: Partial<CarFormRequest>) => {
    if (!form.year || !form.config || !form.color || !form.trim) return;
    const response = await carApi.getCarOptions(
      form.year,
      form.config,
      form.color,
      form.trim,
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
