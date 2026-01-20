import axiosInstance from "@/app/utils/axios";

export const getOrderById = async (id) => {
  const res = await axiosInstance.get(`/order/${id}`);
  return res.data.data;
};
