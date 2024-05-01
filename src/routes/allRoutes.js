import React from "react";


//Home Section
import DetailTour from "../pages/Home/detailTour";
import Login from "../pages/Home/login"
import InfomationTour from "../pages/Home/infomationTour";
import Payment from "../pages/Home/payment";
import HomeSlider from "../pages/HomeSlider/homeSlider";
import FindTour from "../pages/Home/findTour";
import ProfileInfo from "../pages/Profile/profile";
import OrderHistory from "../pages/Profile/orderHistory";
import Dashboard from "../pages/Admin/dashboard";
import ListTourStaff from "../pages/Staff/ListTourStaff";
import ListAccountCustomer from "../pages/Admin/listAccountCustomer";
import CreateTourStaff from "../pages/Staff/CreateTourStaff";
import ListTourBook from "../pages/Staff/ListTourBook"
import ListAccountStaff from "../pages/Admin/listAccountStaff";
import ListTourStaffDetail from "../pages/Staff/ListTourStaffDetail";
import FileUploadImage from "../pages/Profile/FileUploadImage";
import ListTourBookDetail from "../pages/Staff/ListTourBookDetail";
import OrderBookTourDetail from "../pages/Profile/orderBookTourDetail";
import SlotTourStaff from "../pages/Staff/SlotTourStaff";
import SlotTourStaffDetai from "../pages/Staff/SlotTourStaffDetai";
import Contact from "../pages/Home/contact";
import ListTransaction from "../pages/Staff/ListTransaction";
import ListOrderStatus from "../pages/Admin/listOrderStatus";
import FilterHome from "../pages/Home/filterHome";
import ManageBanner from "../pages/Staff/ManageBanner";
import ListCancelTourStaff from "../pages/Staff/ListCancelTourStaff";
import ListTourVitorStaff from "../pages/Staff/ListTourVisitorStaff";
import ListTourVisitorDetailStaff from "../pages/Staff/ListTourVisitorDetailStaff";
import HistoryPayment from "../pages/Profile/historyPayment";
import ListVisitorTourByTour from "../pages/Staff/ListVisitorTourByTour";
import Forbidden from "../pages/Error/error";
import PaymentSuccess from "../pages/Payment/paymentSuccess";
import ListCancelTourAdmin from "../pages/Admin/listCancelTourAdmin";


const Home = React.lazy(() => import("../pages/Home/home"));

const userRoutes = [
  //Home Section
  { path: "/home", component: <Home /> },
  { path: "/", component: <Home /> },
  { path: "/detailTour", component: <DetailTour/>},
  { path: "/login", component: <Login/>},
  { path: "/payment", component: <Payment/>},
  { path: "/findTour", component: <FindTour/>},
  { path: "/profileInfo", component: <ProfileInfo/>},
  { path: "/orderHistory", component: <OrderHistory/>},
  { path: "/infomationTour", component: <InfomationTour/>},
  { path: "/orderBookTouDetail", component: <OrderBookTourDetail/>},
  { path: "/filterHome", component: <FilterHome/>},
  { path: "/contact", component: <Contact/>},
  { path: "/historyPayment", component: <HistoryPayment/>},
  { path: "/forbidden", component: <Forbidden/>},
  { path: "/paymentSuccess", component: <PaymentSuccess/>},









];

const authRoutes = [

  { path: "/dashboard", component: <Dashboard /> },
  { path: "/listTourStaff", component: <ListTourStaff /> },
  { path: "/listTourStaffDetail", component: <ListTourStaffDetail /> },
  { path: "/createToutStaff", component: <CreateTourStaff /> },
  { path: "/listTourBook", component: <ListTourBook /> },
  { path: "/listAccountCustomer", component: <ListAccountCustomer /> },
  { path: "/listAccountStaff", component: <ListAccountStaff /> },
  { path: "/homeSlider", component: <HomeSlider/>},
  { path: "/fileImage", component: <FileUploadImage/>},
  { path: "/listTourBookDetail", component: <ListTourBookDetail/>},
  { path: "/slotTourStaff", component: <SlotTourStaff/>},
  { path: "/slotTourStaffDetail", component: <SlotTourStaffDetai/>},
  { path: "/listTourBookDetail", component: <ListTourStaffDetail/>},
  { path: "/listTransaction", component: <ListTransaction/>},
  { path: "/listOrderStatus", component: <ListOrderStatus /> },
  { path: "/manageBanner", component: <ManageBanner/>},
  { path: "/listCancelTourStaff", component: <ListCancelTourStaff/>},
  { path: "/listTourVisitorStaff", component: <ListTourVitorStaff/>},
  { path: "/listTourVisitorDetailStaff", component: <ListTourVisitorDetailStaff/>},
  { path: "/listVisitorTourByTour", component: <ListVisitorTourByTour/>},
  { path: "/listCancelTourAdmin", component: <ListCancelTourAdmin/>},








];

export { userRoutes, authRoutes };
