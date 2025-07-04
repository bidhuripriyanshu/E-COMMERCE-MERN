import {Link} from 'react-router-dom';
import {FaSearch,FaShoppingBag,FaUser,FaSignOutAlt}from "react-icons/fa"
const user={_id:"ferug",role:"admin"} // add tempory id 

const Header = ()=>{
    
    return (

        <nav>
           
        <Link to ={"/"}>Home</Link>
        <Link to ={"/search"}><FaSearch/></Link>
        <Link to ={"/cart"}><FaShoppingBag/></Link>

        {user?._id?(
            <>
            <button>
                <FaUser/>
            </button>
            <dialog>
                <div>{user.role ==="admin" && (<Link to ="/admin/dashboard">Admin</Link>)}</div>
              
              <Link to ="/orders">Orders</Link>
              <button><FaSignOutAlt/></button>
            </dialog>
            </>
        ):(
            <Link to ={"/login"}>FaSignInAlt</Link>
        )}
        
        
        </nav>
    )
};


export default Header;