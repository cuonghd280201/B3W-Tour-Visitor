const SERVICE_URL = "https://tour-booking-server-production.up.railway.app/tour-booking/api/v1";

export default {
    base: SERVICE_URL,
    endpoint:{
        auth: {    
            profile: "/user/profile",   
            updateProfile: "/user/update",
            transaction: "/transaction/all",
            paging: "pageNumber=${currentPage}&pageSize=${pageSize}",
            sorting: "sortBy=${sortBy}&sortOrder=${sortOrder}",
            

        },
        tour: {
            createTour: "/staff/tour/create",
            getAllTour: "/tour/all",
            paging: "pageNumber=${currentPage}&pageSize=${pageSize}",
            sorting: "sortBy=${sortBy}&sortOrder=${sortOrder}",
            getTourDetailByID: "/tour/get/${tourId}",
            getSlotDetailByID: "/staff/tourTime/getTimeDetail/${timeId}",
            filterTour: "/tour/filter",
            keyWord: "keyWord=${keyWord}",
            endLocation:"endLocation=${endLocation}",
            price:"minPrice=${minPrice}&maxPrice=${maxPrice}",
            startDate:"startDate=${startDate}",
            city:"/city/all",
        }, 
        order: {
            createOrder: "/order/create?tourTimeId=${tourTimeId}&paid=${paid}",
            getAllTour: "/order/all",
            orderStatus: "orderStatus=${orderStatus}",
            getOrderDetailByID: "/order/${orderId}",
            getTourOrdered: "/staff/tour/ordered",
            keyWord: "keyWord=${keyWord}",
            getTourVisitor: "/staff/tourVisitor/${tourTimeId}",
        },
        payment: {
            checkout: "/payment/check-out?uuid=${uuid}",
            transaction: "/dashboard/transactions",
            paging: "pageNumber=${currentPage}&pageSize=${pageSize}",
            sorting: "sortBy=${sortBy}&sortOrder=${sortOrder}",
            postPayment: "/vn-pay/payment",
            amount: "amount=${amount}",
            vnp_TxnRef: "vnp_TxnRef=${vnp_TxnRef}",
        },
        staff:{
            updateImage:"/staff/tourImage/updateImage",
            addMoreImage:"/staff/tourImage/addMoreImage",
            deleteImage:"/staff/tourImage/${imageId}",
        },
        banner:{
            listBanner:"/tour/tourBanner/viewBanner",
            postBanner:"/staff/tourBanner/addMoreBanner",     
            deleteBanner:"/staff/tourBanner/deleteBanner?id=${id}", 
        },
        cancel:{
            customerCancel:"/order/cancel/${orderId}",
            getAllOrderStatus:"/dashboard/orderStatus",
            staffCancel:"/staff/order/cancel/${orderId}",
            value:"value=${value}",
        },

        admin:{
            orderSumary:"/dashboard/orderSumary",
            getRoleNumber: "/dashboard/getRoleNumber",
            getAllUser: "/dashboard/getAllUser",
            getAllStaff: "/dashboard/getAllStaff",
            getOrderStatus: "/dashboard/orderStatus",
            getRevenue: "/dashboard/order/revenue",
            banUserById:"/dashboard/user/disable"
        }
        
        
    }
}
