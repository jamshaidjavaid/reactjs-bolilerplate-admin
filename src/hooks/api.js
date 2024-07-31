import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ShowMessageError,
  ShowMessageSuccess,
  ShowMessageLoading,
} from "./ShowMessage";
import { logout, updateToken } from "../Redux/slices/authSlice";

const path = new Date().getTime().toString();

// Custom hook for API requests
export function useApiRequest(method) {
  const { token, refreshToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const apiCall = async ({ path, data = {} }) => {
    // console.log(path, data);
    try {
      const params = [
        `${BASE_URL}/${path}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ];

      if (method === "delete") {
        params.splice(1, 1);
      }

      const response = await axios[method](...params);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const response = await axios.post(`${BASE_URL}/auth/refresh-tokens`, {
            refreshToken,
          });
          dispatch(
            updateToken({
              token: response.data.access.token,
              tokenExpiry: response.data.access.expires,
              refreshToken: response.data.refresh.token,
              refreshTokenExpiry: response.data.refresh.expires,
            })
          );
          // Retry the original request with the new token
          return apiCall({ path, data });
        } catch (refreshError) {
          console.log("Failed to refresh token: ", refreshError);
          dispatch(logout()); // Handle logout or other error handling as needed
          throw refreshError; // Propagate the error further
        }
      }
      throw error; // Re-throw other errors to be caught by the caller
    }
  };

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: apiCall,
    onError: (error) => {
      ShowMessageError(error?.response?.data?.message, path);
    },
  });

  useEffect(() => {
    if (isLoading && path) {
      ShowMessageLoading(path);
    }
  }, [isLoading]);

  function handleMutation(
    config = { path: "", data: {} },
    afterSuccess = () => {},
    afterError = () => {}
  ) {
    console.log(config);
    mutate(config, {
      onSuccess: (res) => {
        ShowMessageSuccess(res?.message, path);
        afterSuccess(res);
      },
      onError: (res) => {
        console.log(res);
        ShowMessageError(res?.response?.data?.message, path);
        afterError(res?.response?.data);
      },
    });
  }

  return { isLoading, handleMutation };
}

// Custom hooks for specific API operations
export function useDeleteApi() {
  return useApiRequest("delete");
}

export function usePatchApi() {
  return useApiRequest("patch");
}

export function usePostApi() {
  return useApiRequest("post");
}

export function usePutApi() {
  return useApiRequest("put");
}

// Custom hook for fetching data
export function useFetch(queryKey, path, config = {}) {
  const { token, refreshToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${path}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const response = await axios.post(`${BASE_URL}/auth/refresh-tokens`, {
            refreshToken,
          });
          dispatch(
            updateToken({
              token: response.data.access.token,
              tokenExpiry: response.data.access.expires,
              refreshToken: response.data.refresh.token,
              refreshTokenExpiry: response.data.refresh.expires,
            })
          );
          // Retry the original request with the new token
          const newData = await axios.get(`${BASE_URL}/${path}`, {
            headers: {
              Authorization: `Bearer ${response.data.access.token}`,
            },
          });
          return newData.data;
        } catch (refreshError) {
          console.log("Failed to refresh token: ", refreshError);
          dispatch(logout()); // Handle logout or other error handling as needed
          throw refreshError; // Propagate the error further
        }
      }
      throw error; // Re-throw other errors to be caught by the caller
    }
  };

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: fetchData,
    ...config,
  });

  useEffect(() => {
    if (error) {
      // Handle error, such as showing an error message
      console.error("Error fetching data:", error);
    }
  }, [error]);

  return { response, isLoading };
}
