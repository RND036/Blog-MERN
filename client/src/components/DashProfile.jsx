import { Button, TextInput } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user);
    const [imageFile,setImageFile] = useState(null);
    const [imageFileUrl,setImageFileUrl] = useState(null);
    //importing useRef to access the file picker
    const filePickerRef = React.useRef();

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
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>

    <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
    <form className='flex flex-col gap-4'>
        {/*giving access only for images to upload*/}
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        {/*from the onlick event we can access the file picker in above one*/}
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ' onClick={()=>filePickerRef.current.click()} >

        <img src={imageFileUrl || currentUser.profilePicture} alt="user"  className='rounded-full w-full h-full border-8 border-[lightgray] object-cover'/>
        </div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='text' id='password' placeholder='password'/>
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
    </div>
  )
}
