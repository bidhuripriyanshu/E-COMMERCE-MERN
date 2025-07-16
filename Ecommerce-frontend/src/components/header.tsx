import {Link} from 'react-router-dom';
import {FaSearch,FaShoppingBag,FaUser,FaSignOutAlt,FaSignInAlt}from "react-icons/fa"
const user={_id:"ferug",role:"admin"} // add tempory id 
import { useState } from 'react';




const Header = ()=>{
    const[isOpen,setIsOpen]=useState<boolean>(false);


    return (

        <nav className='header'>
           
        <Link onClick={() => setIsOpen((false))} to ={"/"}>HOME</Link>
        <Link onClick={() => setIsOpen((false))} to ={"/search"}><FaSearch/></Link>
        <Link onClick={() => setIsOpen((false))} to ={"/card"}><FaShoppingBag/></Link>

        {user?._id?(
            <>
            <button onClick={() => setIsOpen((prev)=>!prev)}>
                <FaUser/>
            </button>
            <dialog open={isOpen}>
                <div>{user.role ==="admin" && (<Link to ="/admin/dashboard">Admin</Link>)}</div>
              
              <Link to ="/orders">Orders</Link>
              <button><FaSignOutAlt/></button>
            </dialog>
            </>
        ):(
            <Link to ={"/login"}><FaSignInAlt/></Link>
        )}
        
        
        </nav>
    )
};


export default Header;