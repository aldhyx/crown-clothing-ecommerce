import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const Navigation = () => {
    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to="/">
                    <div>Logo</div>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navigation