import React from 'react'
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.contex';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to="/">
                    <CrownLogo className='logo' />
                </Link>
                <div className="nav-links-container">
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>

                    {currentUser ? (
                        <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )}

                    <CartIcon />
                </div>
            </div>
            <CartDropdown />
            <Outlet />
        </>
    )
}

export default Navigation