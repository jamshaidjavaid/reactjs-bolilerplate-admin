import { useFetch } from "../hooks/api";

export function useAllProducts() {
  const { response, isLoading } = useFetch(["products"], `products`);
  return { response, isLoading };
}
