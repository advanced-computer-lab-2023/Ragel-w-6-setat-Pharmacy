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
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import AdminHeader from "components/Headers/AdminHeader.js";
import AddAdmin from "components/AdminComponents/AddAdmin.js";
import AdminDetails from "components/AdminComponents/AdminDetails.js";
import DeleteAdmin from "components/AdminComponents/DeleteAdmin.js";
import { useEffect } from "react";
const Index = (props) => {
  const [admins, setAdmins] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await fetch('/api/admin/getAdmins');
      const json = await response.json(); // array of objects where each represents an admin
      console.log(json);
      if (response.ok) {
        setAdmins(json);
      }
    };

    fetchAdmins();
  }, []); // empty array means it will only run once
  return (
    <>
      <AdminHeader />
      {/* Page content */}
     <Container>
     <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Admins</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table tablesorter">
                  <thead className="text-primary">
                    <tr>
                      <th>Username</th>
                      <th>Password</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins &&
                      admins.map((admin) => (
                        <AdminDetails key={admin._id} admin={admin} />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    <AddAdmin/>
    
    <DeleteAdmin/>
     </Container>
    
    </>
  );
};

export default Index;
