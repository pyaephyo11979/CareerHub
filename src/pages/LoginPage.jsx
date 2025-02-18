import LoginForm from "../components/LoginForm";

import { useApp } from "../App";

export default function LoginPage(){
    const {setAuth} = useApp();
    return(
        <LoginForm />
    )
}