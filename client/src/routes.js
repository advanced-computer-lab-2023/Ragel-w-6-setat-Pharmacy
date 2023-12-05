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
//import PatientDashboard from "views/Dashboards/PatientDashboard.js";
//mport PharmacistDashboard from "views/Dashboards/PharmacistDashboard.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import PatientRegister from "views/Authentication/PatientRegister.js";
import PharmacistRegister from "views/Authentication/PharmacistRegister.js";
import Login from "views/examples/Login.js";
import ForgotPassword from "views/examples/ForgotPassword.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import HandlePharmReq from "views/AdminViews/HandlePharmReq";
import UploadDocuments from "views/PharmacistViews/UploadDocuments";
import Admins from "views/AdminViews/Admins";

import Cart from "views/PatientViews/Cart";
import Checkout from "views/PatientViews/Checkout";
import Orders from "views/PatientViews/Orders";
import ViewAllMedicinePatient from "views/PatientViews/ViewAllMedicine";
import ChangePassword from "views/PatientViews/ChangePassword";


import AddMedicine from "views/PharmacistViews/AddMedicine";
import EditMedicine from "views/PharmacistViews/EditMedicine";
import ViewAllMedicinePharmacist from "views/PharmacistViews/ViewAllMedicine";
import ViewMedSales from "views/PharmacistViews/ViewMedSales";




//TODO fix this with the respective layout
//TODO add menu levewls
var routes = [

  //admin
  {
    path: "/",
    name: "Change Password",
    icon: "ni ni-tv-2 text-primary",
    component: <ChangePassword />,
    layout: "/admin",
  },
  {
    path: "/patients",
    name: "Patients",
    icon: "ni ni-tv-2 text-primary",
    component: <PatientAdmin />,
    layout: "/admin",
  },

  {
    path: "/pharmacists",
    name: "Pharmacists",
    icon: "ni ni-tv-2 text-primary",
    component: <PharmacistAdmin />,
    layout: "/admin",
  },
  {
    path: "/admins",
    name: "Admins",
    icon: "ni ni-tv-2 text-primary",
    component: <Admins />,
    layout: "/admin",
  },
  
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },

  //Patient
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
    icon: "ni ni-cart   text-white",
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
    path: "/",
    name: "Change Password",
    icon: "ni ni-settings-gear-65  text-white",
    component: <ChangePassword />,
    layout: "/patient",
  },
 

  //Pharmacist
  {
    path: "/",
    name: "ChangePassword",
    icon: "ni ni-tv-2 text-primary",
    component: <ChangePassword />,
    layout: "/pharmacist",
  },
  {
    path: "/addmedicine",
    name: "Add Medicine",
    icon: "ni ni-tv-2 text-primary",
    component: <AddMedicine />,
    layout: "/pharmacist",
  },
  {
    path: "/editMedicine",
    name: "Edit Medicine",
    icon: "ni ni-tv-2 text-primary",
    component: <EditMedicine />,
    layout: "/pharmacist",
  },
  
  {
    path: "/viewallmedicine",
    name: "View All Medicine - Pharmacist",
    icon: "ni ni-tv-2 text-primary",
    component: <ViewAllMedicinePharmacist />,
    layout: "/pharmacist",
  },
  {
    path: "/viewmedsales",
    name: "View Med Sales",
    icon: "ni ni-tv-2 text-primary",
    component: <ViewMedSales />,
    layout: "/pharmacist",
  },
  { //Handle Pharm Req in the layout Admin (will make a layout for every role)
    path: "/UploadDocuments",
    name: "Upload documents",
    icon: "ni ni-circle-08 text-pink",
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
    path: "/forgotPassword",
    name: "Forgot Password",
    icon: "ni ni-key-25 text-white",
    component: <ForgotPassword />,
    layout: "/patient",
  },
  // {
  //   path: "/patientRegister",
  //   name: "PatientRegister",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <PatientRegister />,
  //   layout: "/auth",
  // },
  //  {
  //   path: "/pharmacistRegister",
  //   name: "PharmacistRegister",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <PharmacistRegister />,
  //   layout: "/auth",
  // },
  { //Handle Pharm Req in the layout Admin (will make a layout for every role)
    path: "/HandlePharmReq",
    name: "HandlePharmReq",
    icon: "ni ni-circle-08 text-pink",
    component: <HandlePharmReq />,
    layout: "/admin",
  },
//FIXME change layout to /pharmacist 
//FIXME how to render profile info of that specific pharmacist
 
  
];
export default routes;
