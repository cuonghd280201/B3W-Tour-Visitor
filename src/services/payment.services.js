
import urlConstant from "../common/urlConstant";
import axiosLocalHost from "../utils/customAxios";

const createCheckout = async (uuid) => {
 
    const baseUrl = urlConstant.endpoint.payment.checkout.replace("${uuid}", uuid);   
    try {
        const response = await axiosLocalHost.sendAuthorizedRequest(baseUrl, "POST");
        return response.data; 
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; 
    }
};

const getAllTransaction = async (currentPage, pageSize, sortBy, sortOrder) => {
    const serviceUrl = urlConstant.endpoint.payment.transaction + "?";
    const pagingUrl = urlConstant.endpoint.payment.paging
      .replace("${currentPage}", currentPage)
      .replace("${pageSize}", pageSize);
    const sortUrl = urlConstant.endpoint.payment.sorting
      .replace("${sortBy}", sortBy)
      .replace("${sortOrder}", sortOrder);
  
    const fullUrl = serviceUrl + pagingUrl + '&' + sortUrl;
    const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "GET");
    return response;
  };

  const postPayMentVNPay = async (amount, vnp_TxnRef)=>{
    const serviceUrl = urlConstant.endpoint.payment.postPayment + "?";
    const amountUrl = urlConstant.endpoint.payment.amount
    .replace("${amount}", amount);
    const vnp_TxnRefUrl = urlConstant.endpoint.payment.vnp_TxnRef
    .replace("${vnp_TxnRef}", vnp_TxnRef);
    const fullUrl = serviceUrl + amountUrl + '&' + vnp_TxnRefUrl;
    const response = await axiosLocalHost.sendAuthorizedRequest(fullUrl, "POST");
    return response;
    
  }

export default {
    createCheckout,
    getAllTransaction,
    postPayMentVNPay,
    
};
