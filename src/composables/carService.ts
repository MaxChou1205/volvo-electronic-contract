import { ref } from "vue";
import { carApi } from "@/api/carApi";
import { OrderDetail } from "@/types/orderType";

type OptionItem = {
  value: string | number;
  label: string;
  code: string;
};

const fieldInfoMap = new Map([
  [
    "modelId",
    {
      optionsKey: "modelOptions",
      callbackKey: "",
      nextKey: "modelYearId",
      labelKey: "modelName",
      codeKey: "modelCode",
    },
  ],
  [
    "modelYearId",
    {
      optionsKey: "yearOptions",
      callbackKey: "getYearOptions",
      nextKey: "modelConfigId",
      labelKey: "modelYearName",
      codeKey: "modelYearCode",
    },
  ],
  [
    "modelConfigId",
    {
      optionsKey: "configOptions",
      callbackKey: "getConfigOptions",
      nextKey: "modelColorId",
      labelKey: "modelConfigName",
      codeKey: "modelConfigCode",
    },
  ],
  [
    "modelColorId",
    {
      optionsKey: "colorOptions",
      callbackKey: "getColorOptions",
      nextKey: "modelTrimId",
      labelKey: "modelColorName",
      codeKey: "modelColorCode",
    },
  ],
  [
    "modelTrimId",
    {
      optionsKey: "trimOptions",
      callbackKey: "getTrimOptions",
      nextKey: "modelOptionId",
      labelKey: "modelTrimName",
      codeKey: "modelTrimCode",
    },
  ],
  [
    "modelOptionId",
    {
      optionsKey: "optionOptions",
      callbackKey: "getOptionOptions",
    },
  ],
]);
const fieldInfoMapKeys = Array.from(fieldInfoMap.keys());

export const useCarService = () => {
  const formOptions = ref({
    modelOptions: [] as OptionItem[],
    yearOptions: [] as OptionItem[],
    configOptions: [] as OptionItem[],
    colorOptions: [] as OptionItem[],
    trimOptions: [] as OptionItem[],
    optionOptions: [] as (OptionItem & {
      optionId: string;
      optionCode: string;
      optionName: string;
      optionPrice: number;
    })[],
  });

  const getCarList = async () => {
    const response = await carApi.getCarList();
    const result = response.map((item) => ({
      value: item.modelId,
      code: item.modelCode,
      label: item.modelName,
    }));
    formOptions.value.modelOptions = result;
    return result;
  };

  const getYearOptions = async (form: Partial<OrderDetail>) => {
    if (!form.modelId) return;
    const response = await carApi.getCarYears(form.modelId);
    const result = response.map((item) => ({
      value: item.modelYearId,
      code: item.modelYearCode,
      label: item.modelYearName,
    }));
    formOptions.value.yearOptions = result;
    return result;
  };

  const getConfigOptions = async (form: Partial<OrderDetail>) => {
    if (!form.modelId || !form.modelYearId) return;
    const response = await carApi.getCarConfigs(form.modelId, form.modelYearId);
    const result = response.map((item) => ({
      value: item.modelConfigId,
      code: item.modelConfigCode,
      label: item.modelConfigName,
    }));
    formOptions.value.configOptions = result;
    return result;
  };

  const getColorOptions = async (form: Partial<OrderDetail>) => {
    if (!form.modelYearCode || !form.modelConfigCode) return;
    const response = await carApi.getCarColors(
      form.modelYearCode,
      form.modelConfigCode,
    );
    const result = response.map((item) => ({
      value: String(item.modelColorId),
      code: item.modelColorCode,
      label: item.modelColorName,
    }));
    formOptions.value.colorOptions = result;
    return result;
  };

  const getTrimOptions = async (form: Partial<OrderDetail>) => {
    if (!form.modelYearCode || !form.modelConfigCode || !form.modelColorCode)
      return;
    const response = await carApi.getCarTrims(
      form.modelYearCode,
      form.modelConfigCode,
      form.modelColorCode,
    );
    const result = response.map((item) => ({
      value: String(item.modelTrimId),
      code: item.modelTrimCode,
      label: item.modelTrimName,
    }));
    formOptions.value.trimOptions = result;
    return result;
  };

  const getOptionOptions = async (form: Partial<OrderDetail>) => {
    if (
      !form.modelYearId ||
      !form.modelConfigCode ||
      !form.modelColorCode ||
      !form.modelTrimCode
    )
      return;
    const response = await carApi.getCarOptions(
      form.modelYearId,
      form.modelConfigCode,
      form.modelColorCode,
      form.modelTrimCode,
    );
    const result = response.map((item) => ({
      optionId: String(item.modelOptionId),
      optionCode: item.modelOptionCode,
      optionName: item.modelOptionName,
      optionPrice: item.price ?? 0,
      code: item.modelOptionCode,
      label: item.modelOptionName,
      value: String(item.modelOptionId),
    }));
    formOptions.value.optionOptions = result;
    return result;
  };

  const findRestFieldKeys = (currentKey: string) => {
    const currentIndex = fieldInfoMapKeys.indexOf(currentKey);

    if (currentIndex !== -1) {
      return fieldInfoMapKeys.slice(currentIndex + 1);
    }

    return [];
  };

  const setOptions = async (
    optionsKey: string,
    callbackKey: string,
    form: Partial<OrderDetail>,
  ) => {
    if (callbackKey) {
      const options = await (callbackKey in
      {
        getYearOptions,
        getConfigOptions,
        getColorOptions,
        getTrimOptions,
        getOptionOptions,
      }
        ? eval(callbackKey)(form)
        : null);
      if (options) formOptions.value[optionsKey] = options;
    }
  };

  const resetOptions = (formKey: string, form: Partial<OrderDetail>) => {
    const info = fieldInfoMap.get(formKey);
    if (!info) return;

    const restFieldKeys = findRestFieldKeys(formKey);
    restFieldKeys.forEach((key) => {
      form[key] = undefined;
      const info = fieldInfoMap.get(key);
      if (!info) return;
      formOptions.value[info.optionsKey] = [];
    });
  };

  const handleChangeCarInfo = async (
    formKey: string,
    form: Partial<OrderDetail>,
    value?: string,
  ) => {
    resetOptions(formKey, form);
    const info = fieldInfoMap.get(formKey);
    if (!info) return;

    if (value !== undefined) {
      form[formKey] = value;
    }

    if (info.codeKey && info.labelKey) {
      const id = form[formKey];
      const option = formOptions.value[info.optionsKey]?.find(
        (item) => item.value === id,
      );
      if (option) {
        form[info.codeKey] = option.code;
        form[info.labelKey] = option.label;
      }
    }

    if (info.nextKey && fieldInfoMap.get(info.nextKey)) {
      const nextInfo = fieldInfoMap.get(info.nextKey)!;
      if (nextInfo.optionsKey && nextInfo.callbackKey) {
        await setOptions(nextInfo.optionsKey, nextInfo.callbackKey, form);
      }
    }
  };

  return {
    fieldInfoMap,
    formOptions,
    getCarList,
    getYearOptions,
    getConfigOptions,
    getColorOptions,
    getTrimOptions,
    getOptionOptions,
    handleChangeCarInfo,
  };
};
