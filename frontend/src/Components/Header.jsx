import logo from  '../assets/logo2.png'
import { useState , useEffect} from 'react';
import axios from 'axios';
import {User} from 'lucide-react'
const Header = () => {

    const [user,setUser] = useState(null);
    useEffect(()=>{
        axios.get("https://devnotex.onrender.com/api/me" , {withCredentials:true})
        .then((res)=>{
            setUser(res.data)
        })
        .catch((err)=>{
            setUser(null)
            console.log(err);
        })

    },[])


    return(
        <div className="bg-black text-white p-4 flex items-center justify-between shadow-md fixed  w-full top-0 z-10  ">
            <h1 className="text-2xl font-bold">DevNotex</h1>
            {/* <img src={logo} alt="Logo" className="h-16 w-24 rounded-2xl" /> */}
            {!user ?
            (
                  <button className="bg-white text-black px-3 py-1 rounded-md font-bold hover:bg-gray-200 transition">
                <a href="/login">
                    Login
                </a>
            </button>
            ) : (
                <div className="flex items-center space-x-4">
                    <button className="bg-white text-black px-3 py-1 rounded-md font-bold hover:bg-gray-200 transition">
                        <a href="/profile">
                        <User className="h-5 w-5 inline-block font-bold"/>
                        </a>
                    </button>
                </div>
            )}
          
        </div>
    );
}

export default Header;
