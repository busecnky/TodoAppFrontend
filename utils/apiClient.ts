import { Platform } from "react-native";
import { getItem } from "./storage";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;


export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token =
    Platform.OS === "web"
      ? localStorage.getItem("jwtToken")
      : await getItem("jwtToken");

const defaultHeaders = {
  "Content-Type": "application/json",
  ...(token ? { Authorization: token } : {}), 
};

    const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "API request failed");
    }

    const contentType = response.headers.get("content-type");
    return contentType?.includes("application/json")
      ? response.json()
      : response.text();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
