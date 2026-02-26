import React,{useEffect,useState} from 'react'

export default function Protected({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authData = localStorage.getItem("authData");
        if (authData) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);
}