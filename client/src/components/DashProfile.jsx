import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { updateStart,updateFailure,updateSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user);
    const [imageFile,setImageFile] = useState(null);
    const [imageFileUrl,setImageFileUrl] = useState(null);
    //importing useRef to access the file picker
    const filePickerRef = React.useRef()
    // fro sending the upadted username passwordto backend
    const [formData,setFormData] = useState({});
    const dispatch = useDispatch();
    //to show the user data upload sucess or not
    const [updateUserSuccess,setUpdateUserSuccess] = useState(null);
    //for user eroor
    const [updateUserError,setUpdateUserError] = useState(null);

    // function to handle the change in the input fields
    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]: e.target.value});
    }
    console.log (formData);

    const handleImageChange = (e) => {
       const file = (e.target.files[0])//use  0 beacuse we are adding one file only
       if(file){
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));// to create image url from the file
       }
    };
    // creating use effect when change the image it should update in database
    useEffect(() => {
        if(imageFile){
            uploadImage();
        }
    }
    ,[imageFile]);// runs every time when the image change
    //function to upload image
    const uploadImage = async () => {
       // console.log('uploading image'); 
    }
    // function to handle the submit of the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        //for prevent alert messgae display continuosly
        setUpdateUserSuccess(null);
        setUpdateUserError(null);
        //check form data has values or not
        if(Object.keys(formData).length === 0){
            setUpdateUserError('No changes to upload');
            return;
        }
        try {
            //update start slice
            dispatch(updateStart());
            //create request for fetch data 
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            //check if the response is ok or not
            if(!res.ok){
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            }
            else{
                dispatch(updateSuccess(data));
                setUpdateUserSuccess('Profile updated successfully');

            }



            
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
            
        }

    }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>

    <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/*giving access only for images to upload*/}
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        {/*from the onlick event we can access the file picker in above one*/}
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ' onClick={()=>filePickerRef.current.click()} >

        <img src={imageFileUrl || currentUser.profilePicture} alt="user"  className='rounded-full w-full h-full border-8 border-[lightgray] object-cover'/>
        </div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='text' id='password' placeholder='password' onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update

        </Button>
        

    </form>
    <div className='text-red-500 flex justify-between mt-5'>
        <span>
            Delete Account
        </span>
        <span>
           Sign Out
        </span>
    </div>
    {/*alert update sucess message*/}
    {updateUserSuccess && (
      <Alert color='success' className='mt-5'>
      {updateUserSuccess}
    
    </Alert>)}
    {/*alert update error message*/}
    {updateUserError && (
      <Alert color='failure' className='mt-5'>
      {updateUserError}
    </Alert>
)}
</div>
  )
}
