
import urlConstant from "../common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const createOrder = async (tourTimeId, paid, passengers) => {
 
    const baseUrl = urlConstant.endpoint.order.createOrder.replace("${tourTimeId}", tourTimeId).replace("${paid}", paid);;   
    // const serviceUrl = `${baseUrl}?tourTimeId=${encodeURIComponent(tourTimeId)}&paid=1`;
    try {
        const response = await axiosLocalHost.sendAuthorizedRequest(baseUrl, "POST", passengers);
        return response.data; 
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; 
    }
};


const getAllOrder = async (orderStatus, keyWord) => {
    const serviceUrl = urlConstant.endpoint.order.getAllTour + "?";
    let fullUrl = serviceUrl;
    if (orderStatus !== null && orderStatus !== '') {
      const orderStatusUrl = urlConstant.endpoint.order.orderStatus.replace("${orderStatus}", orderStatus);
      fullUrl += orderStatusUrl;
    }
    if (keyWord !== null && keyWord !== '') {
      const keywordUrl = urlConstant.endpoint.order.keyWord.replace("${keyWord}", keyWord);
      fullUrl += '&' + keywordUrl;
    }
    const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
    return response;
  };
  
  const getDetailOrder = async (orderId) => {
    const serviceUrl =
      urlConstant.endpoint.order.getOrderDetailByID.replace(
        "${orderId}",
        orderId
      );
    const response = await axiosLocalHost.sendAuthorizedRequest(
      serviceUrl,
      "GET"
    );
    return response;
  };

  const getAllTourVisitor = async (tourTimeId) => {
    const serviceUrl =
      urlConstant.endpoint.order.getTourVisitor.replace(
        "${tourTimeId}",
        tourTimeId
      );
    const response = await axiosLocalHost.sendAuthorizedRequest(
      serviceUrl,
      "GET"
    );
    return response;
  };

  const getTourOrdered = async (keyWord) => {
    const serviceUrl = urlConstant.endpoint.order.getTourOrdered + "?";
    let fullUrl = serviceUrl;
    if (keyWord !== null && keyWord !== '') {
      const keywordUrl = urlConstant.endpoint.tour.keyWord.replace("${keyWord}", keyWord);
      fullUrl += keywordUrl;
  } 
    const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
    return response;
  };

export default {
    createOrder,
    getAllOrder,
    getDetailOrder,
    getTourOrdered,
    getAllTourVisitor,
};
