import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'; 
//components 
import MedDetails from '../components/Pharmacist_components/MedDetails'

const Medicine=()=>{
    const [medicines,setMedicine]= useState(null)

useEffect(() => {
const fetchMedicine= async()=>{
const response =await fetch('/api/pharmacist/getQuantityAndSalesOfMedicine')
const json = await response.json()
if (response.ok){
    setMedicine(json)
}
} 
fetchMedicine()
    }, [])
return(
    <div className="Medicines">
       <div className="medicine">
       <h2>Medicine Details</h2>
       <Link to="/AddMedicine"><button type="submit">Add a new Medicine</button></Link>
        <Link to="/EditMedicine"><button type="submit">Edit</button></Link>
        <Link to="/FilterAndSearch"><button type="submit">Go to view all Med Details/Search/Filter</button></Link>

        {medicines && medicines.map((medicine)=>(
            
< MedDetails key={medicine.id} medicine ={medicine} />))}
       </div>
    </div>
)
}



export default Medicine