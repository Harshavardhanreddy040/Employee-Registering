import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify"

const CreateEmployee = () => {
  let navigate = useNavigate()
  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      phone:"",
      dob:"",
      designation:"",
      photo:""
    },
    onSubmit:(details,{resetForm})=>{
      axios.post("http://localhost:3000/employee",details)
      resetForm()
      toast.success("Employee Created Successfully😍")
      setTimeout(()=>{
        navigate("/")
      },6000)

      
    }
  })
    let handleImageChange = (e)=>{
    //console.log(e);
    let file = e.target.files[0]
    if(file){
      let reader = new FileReader() //constructor
      reader.onload=()=>{
        formik.setFieldValue("photo",reader.result)
      }
      reader.readAsDataURL(file)  //converting of file into url
    }
  }

  let{name,email,phone,dob,designation,photo} = formik.values  //destructuring
  let {handleChange,handleSubmit} = formik  //destructuring


  return (
    <>
    <div className="form-container">
    <form onSubmit={handleSubmit}  >
      <h2>Create Employee</h2>
      <br />            
      <fieldset >
      {/* <legend>Create Employee</legend> */}
      <label htmlFor="name">Name: </label>
      <input type="text" name ="name" id="name" placeholder="Enter your name" value={name} onChange={handleChange} />
      <br/><br/>
      <label htmlFor="email">Email: </label>
      <input type="email" name="email" id="email" placeholder="Enter your email" value={email} onChange={handleChange} />
      <br /><br />
      <label htmlFor="phone">Phone: </label>
      <input type="text" name ="phone" id="phone" placeholder="Enter your Phone NUmber" value={phone} onChange={handleChange} />
      <br/> <br/>
      <label htmlFor="dob">DOB: </label>
      <input type="date" name="dob" id="dob"placeholder="Enter your dob"  value={dob} onChange={handleChange} />
      <br /><br />
      <label htmlFor="designation">Designation: </label>
      <input type="text" name ="designation" id="designation" placeholder="Enter your Designation" value={designation} onChange={handleChange} />
      <br/> <br/>
      <label htmlFor="photo">Photo: </label>
      <input type="file" name="photo" id="photo" onChange={handleImageChange}  />
      <br /><br />
      <input  className="form-button" type="submit"  />
      </fieldset>
    </form>
    <ToastContainer/>
    <button className="home-button" onClick={()=>navigate("/")}>Go to Home Page</button>
    </div>
    </>
  )
}

export default CreateEmployee