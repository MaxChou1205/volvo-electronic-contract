import { defineStore } from "pinia";

export const useSignatureStore = defineStore("signature", {
  state: () => ({
    buyerSignatureImageSrc: "",
    sellerSignatureImageSrc: "",
  }),
  actions: {
    setBuyerSignatureImageSrc(src: string) {
      this.buyerSignatureImageSrc = src;
    },
    setSellerSignatureImageSrc(src: string) {
      this.sellerSignatureImageSrc = src;
    },
  },
});
