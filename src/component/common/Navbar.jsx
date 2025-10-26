import '../../style/navbar.css';
import { NavLink, useNavigate, useState } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const Navbar = () => {


    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        navigate(`/?search=${searchValue}`)
    }
    const handleLogout = () => {
        ApiService.logout();
        setTimeout(() => {
            navigate('/login')
        }, 500);
    }
    return (
        <nav className='navbar'>
            <div className="navabar-brand">
                <NavLink to="/"><img src="" alt="logo" /></NavLink>
            </div>
            <form className='navbar-search' onSubmit={handleSearchSubmit}>
                <input 
                    type="text" 
                    placeholder='search for products' 
                    value={searchValue} 
                    onChange={handleSearchChange}
                />
                <button type='submit'>Search</button>
            </form>
            <div className="navbar-link">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/categories">Categories</NavLink>
                <NavLink to="/profile">My Account</NavLink>
                <NavLink to="/admin">Admin</NavLink>
                <NavLink to="/login">SignIn/Login</NavLink>
                <NavLink onClick={handleLogout}>Logout</NavLink>
                <NavLink to="/cart">Cart</NavLink>
            </div>
        </nav>
    )
}