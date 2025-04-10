import { ref } from "vue";

const loading = ref(false);
export const useLoading = () => {
  const open = () => {
    loading.value = true;
  };
  const close = () => {
    loading.value = false;
  };
  return { loading, open, close };
};
