import { useContractStore } from "@/stores/contractStore";

export const contractMiddleware = async (to) => {
  const contractStore = useContractStore();
  if (!to.params.orderId) {
    return { name: "order" };
  } else if (to.name === "modelStyle") {
    await contractStore.initContract(to.params.orderId);
    return;
  }

  if (!contractStore.contract.order.orderNo) {
    return { name: "modelStyle", params: { orderId: to.params.orderId } };
  }
};
