import { Button } from 'flowbite-react';
import {AiFillGoogleCircle} from 'react-icons/ai';
import { GoogleAuthProvider,signInWithPopup,getAuth } from 'firebase/auth';
import { app } from '../Firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const handleGoogleClick = async() => {
      //using provider for goole auth 
      const provider = new GoogleAuthProvider();
      //for always asking for account to select
      provider.setCustomParameters({prompt: 'select_account'});

      try{
        const resultsFromGoogle = await signInWithPopup(auth,provider);
        //to save data in the backend
        const res = await fetch('/api/auth/google',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(
            {
              name:resultsFromGoogle.user.displayName,
              email:resultsFromGoogle.user.email,
              googlePhotoUrl:resultsFromGoogle.user.photoURL,
            }),
        })
        const data = await res.json();
        if(res.ok){
          //dispatch the success action
          dispatch(signInSuccess(data));//data in here is the payload for the sucess action
          navigate('/')
        }


      }
      catch(err){
        console.log(err);
      }
        
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}
