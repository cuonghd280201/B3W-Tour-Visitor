import urlConstant from "../common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getOrderSumary = async () => {
  const serviceUrl = urlConstant.endpoint.admin.orderSumary;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getRoleNumber = async () => {
  const serviceUrl = urlConstant.endpoint.admin.getRoleNumber;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getAllUser = async () => {
  const serviceUrl = urlConstant.endpoint.admin.getAllUser;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getAllStaff = async () => {
  const serviceUrl = urlConstant.endpoint.admin.getAllStaff;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getOrderStatus = async (orderStatus) => {
  const serviceUrl = `${urlConstant.endpoint.admin.getOrderStatus}?orderStatus=${orderStatus}`;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "GET"
  );
  return response;
};

const getRevenue = async (days) => {
  const serviceUrl = `${urlConstant.endpoint.admin.getRevenue}?days=${days}`;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "POST"
  );
  return response;
};

const banUserById = async (id) => {
  const serviceUrl = `${urlConstant.endpoint.admin.banUserById}?user_id=${id}`;
  const response = await axiosLocalHost.sendAuthorizedRequest(
    serviceUrl,
    "POST"
  );
  return response;
};

export default {
  getOrderSumary,
  getRoleNumber,
  getAllUser,
  getAllStaff,
  getOrderStatus,
  getRevenue,
  banUserById
};
