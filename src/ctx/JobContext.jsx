import { createContext,useEffect,useState,useContext } from "react";
import { useLoaderData } from "react-router";

export const JobContext = createContext();


export function useJobContext(){
    return useContext(JobContext);
}


export default function JobContextProvider({children}){
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState('');

    const url = "https://careercraftapi.onrender.com/api/post/get"
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result.posts);
            } catch(error) {
                setError("Error fetching data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    },[]);

    return(
        <JobContext.Provider value={{data,isLoading,error}}>
            {children}
        </JobContext.Provider>
    )

}

