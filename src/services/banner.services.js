import urlConstant from "../common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const getListBanner = async () => {
    const serviceUrl = urlConstant.endpoint.banner.listBanner;
    const response = await axiosLocalHost.normalRequest.get(serviceUrl);
    return response;
  };

  const deleteBanner = async (id) => {
    const serviceUrl =
      urlConstant.endpoint.banner.deleteBanner
      .replace(
        "${id}",
        id
      );
    const response = await axiosLocalHost.sendAuthorizedRequest(
      serviceUrl,
      "DELETE"
    );
    return response;
  };

  const createBanner = async (formData) => {

    const baseUrl = urlConstant.endpoint.banner.postBanner;
    try {
      const response = await axiosLocalHost.sendAuthorizedRequest(baseUrl, "POST", formData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  


export default {
    getListBanner,
    deleteBanner,
    createBanner

}