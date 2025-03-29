import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { updateStart,updateFailure,updateSuccess,deleteUserFailure,deleteUserStart,deleteUserSucess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashProfile() {
    const {currentUser,error} = useSelector(state => state.user);
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
    // make a model for dlete the user
    const[showModel,setShowModel] = useState(false);


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
    const handleDeleteUser = async () => {
        setShowModel(false);
        try {
            dispatch(deleteUserStart());
            //create request for delete data
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method: 'DELETE',
            });

            const data = await res.json();
            //check if the response is ok or not
            if(!res.ok){
                dispatch(deleteUserFailure(data.message));
                
            }
            else{
                dispatch(deleteUserSucess(data));
                
            }
            
        } catch (error) {
            deleteUserFailure(error.message);
            
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
    <div className='text-red-500 flex justify-between mt-5' >
        <span className='cursor-pointer' onClick={()=>setShowModel(true)}>
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
    </Alert>)}
      {/*for error message*/}
      {error && (
        <Alert color='failure' className='mt-5'>
        {error}
      </Alert>
)}
{/*} model for show the delete action confirmation*/}
<Modal show={showModel} onClose={()=>setShowModel(false)} popup size='md'>
    <Modal.Header/>
    <Modal.Body>

        <div className='text-center'>
            <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            </div>
            <h3 className='text-lg font-semibold'>Are you sure you want to delete your account?</h3>
            <p className='text-sm text-gray-500'>Once you delete your account, there is no going back.</p>
            <div className='flex justify-center gap-5 mt-5'>
                <Button color='failure' onClick={handleDeleteUser}>
                    Yes, I'm sure 
                </Button>
                <Button color='gray' onClick={()=>setShowModel(false)}>
                    Cancel
                </Button>
            </div>
        </div>
    </Modal.Body>
    </Modal>
</div>
  )
}
