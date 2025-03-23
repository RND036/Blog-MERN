import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth";
export default function SignUp() {
  //for navigation
  const navigate = useNavigate();
  //formdata for store cureent value 
  //setformdata to store new value
  const [formData,setFormData] = useState({});
  //for errors and loading 
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
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
    if(!formData.username || !formData.password || !formData.email){
      return setErrorMessage('Please fill out all the fields.');
    }
    try {
      //loading effect
      setLoading(true);
      setErrorMessage(null);
      //to save data using backend
      //proxy for access backend from here at vite config
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'}, // the type we are sending to it 
        body: JSON.stringify(formData),// to convert json to string
      }); 
      //convert the response to data
      const data = await res.json();
      if (data.sucess === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin')
      }
      
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
      
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
            This is my blog you can signup with your credentials or with Google
          </p>
        </div>
        {/*right*/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="Username" id="username" onChange={HandleChange}/>
            </div>
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
              <TextInput type="password" placeholder="Password" id="password"  onChange={HandleChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {/*adding loading effect*/}
              {
                 loading ? (

                  <>
                   <Spinner size="sm" />
                   <span className="pl-3"> Loading...</span>
                   </>
               
              ): 'Sign Up'
            
             
            }
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an acoount?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
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
