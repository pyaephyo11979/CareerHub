import { createContext,useContext,useState,useEffect } from "react";
import { useLoaderData,useParams } from "react-router";


export const JobDetailContext = createContext();

export default function JobDetailContextProvider({children}){
    const [job,setJob] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState('');

    const {id} = useParams();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/get/${id}`);
                const result = await response.json();
                setJob(result.post);
            } catch(error) {
                setError("Error fetching data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    },[id]);

    return(
        <JobDetailContext.Provider value={{job,isLoading,setIsLoading,setError,error}}>
            {children}
        </JobDetailContext.Provider>
    )
}
