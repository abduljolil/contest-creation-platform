import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";




const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SingUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log(data)
    
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    const imageUrl = res.data.data.display_url; 
    if (res.data.success) {
      const user = {
        name: data.name,
        email: data.email,
        role: data.category,
        accountNumber: data.number,
        salary: data.salary,
        designation: data.designation,
        image: res.data.data.display_url,
      };
      const userRes = await axiosPublic.post('/users', user);
      console.log(userRes.data)
    }
    console.log(res.data);
    createUser(data.email, data.password)

      .then(res => {
        const loggedUser = res.user;
        console.log(loggedUser);
   
        console.log(imageUrl); 
        updateUserProfile(data.name, imageUrl)
          .then(() => {
            console.log('user profile update');
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/');
          })
          .catch((error) => {
            console.log(error);
          })
      })
  };
  // Manager, Director, Engineer, CEO
  return (
    <>
      <div className="hero min-h-screen bg-base-300">
        <div className="hero-content md:flex">
          <div className="text-center lg:w-1/2">
            <h1 className="text-5xl font-bold">SingUp now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" required />

                {errors.name && <span className="text-red-500">name is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bank_Account_No</span>
                </label>
                <input
                  type="text"
                  {...register("number", { required: true })}
                  name="number"
                  placeholder="number"
                  className="input input-bordered"
                  required
                />
                {errors.number && <span className="text-red-500">bank_account_no is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Salary</span>
                </label>
                <input
                  type="text"
                  {...register("salary", { required: true })}
                  name="salary"
                  placeholder="Salary"
                  className="input input-bordered"
                  required
                />
                {errors.salary && <span className="text-red-500"> Salary is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Designation</span>
                </label>
                <input
                  type="text"
                  {...register("designation", { required: true })}
                  name="designation"
                  placeholder="Designation"
                  className="input input-bordered"
                  required
                />
                {errors.designation && <span className="text-red-500"> Designation is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email")} name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", {
                  required: true,
                  maxLength: 20,
                  minLength: 6,
                  pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/
                })} name="password" placeholder="password" className="input input-bordered" />
                {errors.password?.type === 'required' && <span className="text-red-500">password  is required</span>}
                {errors.password?.type === 'minLength' && <span className="text-red-500">password must be 6 characters</span>}
                {errors.password?.type === 'maxLength' && <span className="text-red-500">password must be less then 20 characters</span>}
                {errors.password?.type === 'pattern' && <span className="text-red-500">password must be one uppercase and one lower case ,Number or special characters</span>}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image</span>
                  </label>
                  <input type="file" {...register("image", { required: true })} className="file-input w-full max-w-xs" />
                  {errors.image && <span className="text-red-500">  Image  is required</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text"> role*</span>
                  </label>
                  <select defaultValue="Employee" {...register('category', { required: true })}
                    className="select select-bordered w-full">
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                    <option value="admin">Admin</option>

                  </select>
                  {errors.category && <span className="text-red-500">  Image  is required</span>}
                </div>
              </div>
              <div className="form-control mt-6">
                <input type="submit" className="btn btn-primary" value="SingUp" />
              </div>
            </form>
            <p className='text-lg  text-center py-5'><small>New Here?<Link className='font-bold' to='/login'> Already account here</Link></small></p>
          </div>
        </div>
      </div>
    </>

  );
};

export default SingUp;