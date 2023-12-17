/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
//import AdminDashboard from "views/Dashboards/AdminDashboard.js";
import PatientAdmin from "views/AdminViews/Patient.js";
import PharmacistAdmin from "views/AdminViews/Pharmacists.js";
import PatientDashboard from "views/DashBoards/PatientDashboard.js";
import PharmacistDashboard from "views/DashBoards/PharmacistDashboard.js";
import AdminDashboard from "views/DashBoards/AdminDashboard.js"

import HandlePharmReq from "views/AdminViews/HandlePharmReq";
import Admins from "views/AdminViews/Admins";
import SalesReport from "views/AdminViews/SalesReport";



// Pharmacist Views
import UploadDocuments from "views/PharmacistViews/UploadDocuments";
import AddMedicine from "views/PharmacistViews/AddMedicine";
import EditMedicine from "views/PharmacistViews/EditMedicine";
import ViewAllMedicinePharmacist from "views/PharmacistViews/ViewAllMedicine";
import ViewMedSales from "views/PharmacistViews/ViewMedSales";
import SalesReportPharma from "views/PharmacistViews/SalesReportPharma";
import FilterSalesReport from "views/PharmacistViews/FilterSalesReport";

// Patient Views
import Cart from "views/PatientViews/Cart";
import Checkout from "views/PatientViews/Checkout";
import Orders from "views/PatientViews/Orders";
import ViewAllMedicinePatient from "views/PatientViews/ViewAllMedicine";
import ChangePassword from "views/PatientViews/ChangePassword";

import ChatWithPharmacist from "views/PatientViews/ChatWithPharmacist";
import ChatWithPatients from "views/PharmacistViews/ChatWithPatients";


// Authentication
import PatientRegister from "views/Authentication/PatientRegister.js";
import PharmacistRegister from "views/Authentication/PharmacistRegister.js";

// Examples
import Login from "views/examples/Login.js";
import ForgotPassword from "views/examples/ForgotPassword.js";
import Profile from "views/examples/Profile.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";



// TODO fix this with the respective layout
// TODO add menu levewls
var routes = [

  //admin
  {
    path: "/",
    name: "Home",
    icon: "ni ni-single-02 text-white",
    component: <AdminDashboard />,
    layout: "/admin",
  },
  { //Handle Pharm Req in the layout Admin (will make a layout for every role)
    path: "/HandlePharmReq",
    name: "HandlePharmReq",
    icon: "ni ni-paper-diploma text-white",
    component: <HandlePharmReq />,
    layout: "/admin",
  },
    // FIXME change layout to /pharmacist 
  // FIXME how to render profile info of that specific pharmacist
 
  {
    path: "/SalesReport",
    name: "Sales Report",
    icon: "ni ni-folder-17 text-white",
    component: <SalesReport />,
    layout: "/admin",
  },
  
  {
    path: "/patients",
    name: "Patients",
    icon: "ni ni-single-copy-04 text-white",
    component: <PatientAdmin />,
    layout: "/admin",
  },

  {
    path: "/pharmacists",
    name: "Pharmacists",
    icon: "ni ni-single-copy-04 text-white",
    component: <PharmacistAdmin />,
    layout: "/admin",
  },
  {
    path: "/admins",
    name: "Admins",
    icon: "ni ni-single-copy-04 text-white",
    component: <Admins />,
    layout: "/admin",
  },
  {
    path: "/ChangePassword",
    name: "Change Password",
    icon: "ni ni-settings-gear-65  text-white",
    component: <ChangePassword />,
    layout: "/admin",
  },
  
 

  //Patient
  {
    path: "/",
    name: "Home",
    icon: "ni ni-single-02 text-white",
    component: <PatientDashboard />,
    layout: "/patient",
  },
  {
    path: "/viewallmedicine",
    name: "Medicine",
    icon: "ni ni-collection  text-white",
    component: <ViewAllMedicinePatient />,
    layout: "/patient",
  },
  {
    path: "/cart",
    name: "Cart",
    icon: "ni ni-cart text-white",
    component: <Cart />,
    layout: "/patient",
  },

  {
    path: "/checkout",
    name: "Checkout",
    icon: "ni ni-credit-card  text-white",
    component: <Checkout />,
    layout: "/patient",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "ni ni-delivery-fast text-white",
    component: <Orders />,
    layout: "/patient",
  },
  
  {
    path: "/ChangePassword",
    name: "Change Password",
    icon: "ni ni-settings-gear-65  text-white",
    component: <ChangePassword />,
    layout: "/patient",
  },
  {
    path: "/forgotPassword",
    name: "Forgot Password",
    icon: "ni ni-settings-gear-65  text-white",
    component: <ForgotPassword />,
    layout: "/patient",
  },
  {
    path: "/chatwithpharmacist",
    name: "Chat With Pharmacist",
    icon: "ni ni-tv-2 text-primary",
    component: <ChatWithPharmacist />,
    layout: "/patient",
  },

  {
    path: "/",
    name: "Home",
    icon: "ni ni-single-02 text-white",
    component: <PharmacistDashboard />,
    layout: "/pharmacist",
  },
  {
    path: "/viewallmedicine",
    name: "Medicine",
    icon: "ni ni-collection  text-white",
    component: <ViewAllMedicinePharmacist />,
    layout: "/pharmacist",
  },
  {
    path: "/addmedicine",
    name: "Add Medicine",
    icon: "ni ni-fat-add  text-white",
    component: <AddMedicine />,
    layout: "/pharmacist",
  },
  {
    path: "/editMedicine",
    name: "Edit Medicine",
    icon: "ni ni-curved-next  text-white",
    component: <EditMedicine />,
    layout: "/pharmacist",
  },
  {
    path: "/viewmedsales",
    name: "View Medicine Sales",
    icon: "ni ni-money-coins text-white",
    component: <ViewMedSales />,
    layout: "/pharmacist",
  },
  {
    path: "/SalesReportPharma",
    name: "Sales Report",
    icon: "ni ni-folder-17 text-white",
    component: <SalesReportPharma />,
    layout: "/pharmacist",
  },
  {
    path: "/FilterSalesReport",
    name: "Filter Sales Report",
    icon: "ni ni-folder-17 text-white",
    component: <FilterSalesReport />,
    layout: "/pharmacist",
  },
 
  {
    path: "/ChangePassword",
    name: "Change Password",
    icon: "ni ni-settings-gear-65  text-white",
    component: <ChangePassword />,
    layout: "/pharmacist",
  },

  {
    path: "/chatwithpatient",
    name: "Chat With Patient",
    icon: "ni ni-tv-2 text-primary",
    component: <ChatWithPatients />,
    layout: "/pharmacist",
  },
 
 
  { //Handle Pharm Req in the layout Admin (will make a layout for every role)
    path: "/UploadDocuments",
    name: "Upload documents",
    icon: "ni ni-cloud-upload-96 text-white",
    component: <UploadDocuments />,
    layout: "/pharmacist",
  },
  
  

//auth
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-white",
    component: <Login />,
    layout: "/auth",
  },
  
  {
    path: "/patientRegister",
    name: "PatientRegister",
    icon: "ni ni-circle-08 text-pink",
    component: <PatientRegister />,
    layout: "/auth",
  },
   {
    path: "/pharmacistRegister",
    name: "PharmacistRegister",
    icon: "ni ni-circle-08 text-pink",
    component: <PharmacistRegister />,
    layout: "/auth",
  },
 
 
];

export default routes;