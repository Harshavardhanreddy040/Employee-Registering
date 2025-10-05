import axios from "axios"
import { useFormik } from "formik"
import { useEffect } from "react"
import {  useNavigate, useParams } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

const UpdateEmployee = () => {
  let navigate = useNavigate()
  let {id}=useParams()
  let formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      phone:"",
      dob:"",
      designation:"",
      photo:""
    },
    onSubmit: (details,{resetForm})=>{
      // console.log(details);
      axios.put(`http://localhost:3000/employee/${id}`,details)
      resetForm()
      toast.success("Employee Updated Successfully😊")
      setTimeout(()=>{
        navigate("/")
      },400)
    }
  })

  let fetchData =async ()=>{
    let {data} = await axios.get(`http://localhost:3000/employee/${id}`)
    formik.setValues(data)
  }

  useEffect(()=>{
    fetchData()
  },[])

  let {name,email,phone,dob,designation,photo} =formik.values
  let {handleChange,handleSubmit} = formik

  let handleImageChange = (e)=>{
    let file = e.target.files[0]
    console.log(file);
     if(file){
      let reader = new FileReader() //constructor
      reader.onload=()=>{
        formik.setFieldValue("photo",reader.result)
      }
      reader.readAsDataURL(file)  //converting of file into url
    }

  }
  return (
    <div className="update-form">
      <form onSubmit={handleSubmit} >
      <fieldset >
      <legend>Update Employee</legend>
      <label htmlFor="name">Name:</label>
      <input type="text" name ="name" id="name" placeholder="Enter your name" value={name} onChange={handleChange} />
      <br/><br/>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" placeholder="Enter your email" value={email} onChange={handleChange} />
      <br /><br />
      <label htmlFor="phone">Phone:</label>
      <input type="text" name ="phone" id="phone" placeholder="Enter your Phone NUmber" value={phone} onChange={handleChange} />
      <br/> <br/>
      <label htmlFor="dob">DOB:</label>
      <input type="date" name="dob" id="dob"placeholder="Enter your dob"  value={dob} onChange={handleChange} />
      <br /><br />
      <label htmlFor="designation">Designation:</label>
      <input type="text" name ="designation" id="designation" placeholder="Enter your Designation" value={designation} onChange={handleChange} />
      <br/> <br/>
      <label htmlFor="photo">Photo:</label>
      <input type="file" name="photo" id="photo" onChange={handleImageChange}  />
      <br /><br />
      <input type="submit"  />
      </fieldset>
    </form>
    <ToastContainer/>
    <button onClick={()=>navigate("/")}>Go to HomePage</button>

    </div>
  )
}
export default UpdateEmployee