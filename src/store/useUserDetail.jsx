import {useEffect,useState} from "react";


export default  function useUserDetail(userId){
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        if(!userId){
            setIsLoading(false);
            return;
        }

        const getUserData = async ()=>{
            try{
                const response = await fetch(`https://wspapi.onrender.com/api/user/get/${userId}`);
                if(!response.ok){
                    setError('User Not found, please try again');
                    throw new Error('User Not found, please try again');
                }else{
                    const {user}=await response.json();
                    setUserData(user);
                    setIsLoading(false);
                }
            }catch(error){
               setError(`Something went Wrong ${error}`)
            }finally{
                setIsLoading(false)
            }
            }
        getUserData();
    },[userId])

    return {userData,isLoading,setIsLoading,error}
}