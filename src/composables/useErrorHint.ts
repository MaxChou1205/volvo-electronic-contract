import { nextTick } from "vue";

export const useErrorHint = () => {
  const scrollToError = () => {
    nextTick(() => {
      const errorElement = document.querySelector(".error");

      if (errorElement) {
        errorElement.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    });
  };

  return { scrollToError };
};
