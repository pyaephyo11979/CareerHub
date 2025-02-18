import { useNavigate } from "react-router-dom";
import { useApp } from "../App";
export default function LogOut(){
    const {setUser} = useApp();
    const navigate = useNavigate();
    localStorage.clear();
    setUser(null);
    navigate('/')
}