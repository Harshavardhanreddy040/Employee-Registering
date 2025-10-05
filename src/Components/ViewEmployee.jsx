import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"

const ViewEmployee = () => {
  let navigate = useNavigate()
  let {id} = useParams()
  // console.log(url);
  let [employee, setEmployee] = useState(null)
  let fetchData = async ()=>{
    let {data} = await axios.get(`http://localhost:3000/employee/${id}`)
    console.log(data); 
    setEmployee(data)
  }
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div className="view-employee">
      {employee == null?"Loading...":
      <article className="card">
         <h1>{employee.name}</h1>
          <p>📧 {employee.email}</p>
          <p>📞 +91 {employee.phone}</p>
          <p>🗓️ {employee.dob}</p>
          <h3>🎯 {employee.designation}</h3>
          <img src={employee.photo} alt={employee.name}  height={150} width={150} /><br />
          <button onClick={()=>navigate("/")}>Go to Home</button>
      </article>
      }
      
    </div>
    
  )
}

export default ViewEmployee