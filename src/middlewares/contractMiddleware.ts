import { useContractStore } from "@/stores/contractStore";

export const contractMiddleware = async (to, from) => {
  const contractStore = useContractStore();
  if (!to.params.orderId) {
    return { name: "order" };
  } else if (
    to.name === "modelStyle" &&
    to.params.orderId !== contractStore.contract.order.orderId
  ) {
    await contractStore.initContract(to.params.orderId);
    return;
  }

  if (!contractStore.contract.order.orderId) {
    return { name: "modelStyle", params: { orderId: to.params.orderId } };
  }
};
