import { useEffect, useState } from "react";

function useJobDetails(postId) {
    const [jobData, setJobData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    //fetch api real: https://wspapi.onrender.com/api/post/get/${postId}

    useEffect(() => {

        if(!postId){
            setIsLoading(false);
            return;
        }

        const getJobData = async () => {
        
            try {
                const response = await fetch(`https://careercraftapi.onrender.com/api/post/get/${postId}`);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                } else {
                    const {post} = await response.json();
                    setJobData(post);
                    setIsLoading(false);
                }
            } catch (error) {
                setError(`Something went wrong ${error}`);
            } finally {
                setIsLoading(false);
            }
        }

        getJobData();
    }, [postId])

    return {jobData, isLoading, setIsLoading, error}
}

export default useJobDetails
