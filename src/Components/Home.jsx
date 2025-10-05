import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const Home = () => {
  let [details,setDetails] = useState(null)
  let navigate = useNavigate()
  let fetchData = async ()=>{
    let {data}= await axios.get("http://localhost:3000/employee")
    setDetails(data)
  }
  useEffect(()=>{
    fetchData()
  },[])
  let handleDelete = (id)=>{
    axios.delete(`http://localhost:3000/employee/${id}`)
    location.reload()
  }
  return (
    <section id="home_page">
      <nav>
        <h1>Employee Registry</h1>
        <button onClick={()=>navigate("create-employee")}>Create Employee</button>
      </nav>
      <main id="details">
      {details == null ? "Loading...":details.map((employee)=>{
        return <article className="employee-card" key={employee.id}>
          <div className="card-body" >
          <img
          src={employee.photo}
          alt={employee.name}
          height={100} width={200} />
          <h1>{employee.name}</h1>
          <p>{employee.email}</p>
          <p>📞 +91 {employee.phone}</p>
          <p>📅 {employee.dob}</p>
          <h2>{employee.designation}</h2>

          <div id="card-button">
          <button onClick={()=>navigate(`/view-employee/${employee.id}`)}>View</button>
          <button onClick={()=>navigate(`/update-employee/${employee.id}`)}
            >update</button>
          <button onClick={()=>handleDelete(employee.id)}>delete</button>
          </div>
          </div>
        </article>
      })}
      </main>
    </section>
  )
}

export default Home