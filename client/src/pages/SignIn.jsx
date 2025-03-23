import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";//to use logics we have to dispatch them
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";//importing the actions from userSlice
import OAuth from "../components/OAuth";

export default function SignIn() {
  //for navigation
  const navigate = useNavigate();
  //formdata for store cureent value 
  //setformdata to store new value
  const [formData,setFormData] = useState({});
  //use useselector for loading and error message form the user slice
  const {loading,eroor:errorMessage} = useSelector((state) => state.user);
  //dispatch for dispatch the actions
  const dispatch = useDispatch();
  //function for handle changes 
  const HandleChange = (e) =>{
    //...formData stor the previous values of datas 
    //setting form data according to the id 
    //trim uses to remove spaces of the user suply messages 
    setFormData({...formData,[e.target.id]:e.target.value.trim()}) 
  };
  //for submit form
  //use async for wait until form data goto database 
  const handleSubmit = async (e) => {
    e.preventDefault();//prevent refreshing the page after data submits
    if( !formData.password || !formData.email){
      return dispatch(signInFailure('Please fill all the fields'));//error loading redux
    }
    try {
      //use redux to signin
      dispatch(signInStart());
      //to save data using backend
      //proxy for access backend from here at vite config
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'}, // the type we are sending to it 
        body: JSON.stringify(formData),// to convert json to string
      }); 
      //convert the response to data
      const data = await res.json();
      if (data.sucess === false){
        return dispatch(signInFailure(data.message));//error loading redux
      }
      if(res.ok){
        //dispatch the success action
        dispatch(signInSuccess(data));//data in here is the payload for the sucess action
        navigate('/')
      }
      
    } catch (error) {
      //dispatch the failure action
      dispatch(signInFailure(error.message));
      
    }

  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/*left*/}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white  text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Ravishka's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is my blog you can signin with your credentials or with Google
          </p>
        </div>
        {/*right*/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
           
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"  onChange={HandleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="*********" id="password"  onChange={HandleChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {/*adding loading effect*/}
              {
                 loading ? (

                  <>
                   <Spinner size="sm" />
                   <span className="pl-3"> Loading...</span>
                   </>
               
              ): 'Sign In'
            
             
            }
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an acoount?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
