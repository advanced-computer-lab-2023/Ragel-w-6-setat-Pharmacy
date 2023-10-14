import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'

// components
import AdminDetails from '../components/Admin/AdminDetails'
import AdminAdd from '../components/Admin/AdminAdd'
import AdminDelete from '../components/Admin/AdminDelete'
import AdminViewPharmacistInfo from '../components/Admin/AdminViewPharmacistInfo'
import AdminViewPharmacistRequests from '../components/Admin/AdminViewPharmacistRequests'
import AdminViewPatientsInfo from '../components/Admin/AdminViewPatientsInfo'
import AdminDeletePharmacist from '../components/Admin/AdminDeletePharmacist'
import AdminDeletePatient from '../components/Admin/AdminDeletePatient'

const Admin = () => {
    const [admins, setAdmins] = useState(null)
    const [pharmacists, setPharmacists] = useState(null)
    const [pharmacistRequests, setPharmacistRequests] = useState(null)
    const [patients, setPatients] = useState(null)

    useEffect(()=> {
        const fetchAdmins = async () => {
           const response = await fetch('/api/admin/getAdmins')
           const json = await response.json() //array of objects where each represents an admin
            console.log(json)
           if(response.ok){
                setAdmins(json)
           }
        }

        const fetchPharmacists = async () => {
            const response = await fetch('/api/admin/getPharmacistsInfo')
            const json = await response.json() //array of objects where each represents an admin
             console.log(json)
            if(response.ok){
                setPharmacists(json)
            }
         }

         const fetchPharmacistRequests  = async () => { 
             const response = await fetch('/api/admin/getPharmacistsRequestsInfo')
             const json = await response.json() //array of objects where each represents an admin
              console.log(json)
             if(response.ok){
                 setPharmacistRequests(json)
             }
          }

          const fetchPatients  = async () => { 
            const response = await fetch('/api/admin/getPatientsInfo')
            const json = await response.json() //array of objects where each represents an admin
             console.log(json)
            if(response.ok){
                setPatients(json)
            }
         }

         
        fetchAdmins()
        fetchPharmacists()
        fetchPharmacistRequests()
        fetchPatients()

    }, []) //empty array means it will only run once
    return (
        
        <div className="admin">
        <div className="details-container">
          <div className="admins">
          <h3>Admins</h3>
            {admins &&
              admins.map((admin) => (
                <AdminDetails key={admin._id} admin={admin} />
              ))}
          </div>
          <div className="admins">
            <h3>Pharmacists</h3>
            {pharmacists &&
              pharmacists.map((pharmacist) => (
                <AdminViewPharmacistInfo key={pharmacist._id} pharmacist={pharmacist}
                />
              ))}
          </div>
          <div className="admins">
            <h3>Pharmacist Requests</h3>
            {pharmacistRequests &&
              pharmacistRequests.map((pharmacistRequest) => (
                <AdminViewPharmacistRequests key={pharmacistRequest._id} pharmacistRequest={pharmacistRequest}
                />
              ))}
          </div>
          <div className="admins">
            <h3>Patients</h3>
            {patients &&
              patients.map((patient) => (
                <AdminViewPatientsInfo key={patient._id} patient={patient}
                />
              ))}
          </div>
        </div>
  
        <AdminAdd />
        <AdminDelete />
        <AdminDeletePharmacist />
        <AdminDeletePatient />
      </div>
    )
}

export default Admin