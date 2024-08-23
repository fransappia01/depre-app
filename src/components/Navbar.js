import React from 'react';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../styles/components/Navbar.css';

const Navbar = ({ toggleSidebar}) => {
    
    return (
        <>
            <div className='container-navbar'>
                <div className='menu-logo'>
                    <IconButton onClick={toggleSidebar}>
                        <Menu style={{ color: 'white' }} />
                    </IconButton>
                </div> 
                <div className='container-logos'>
                    DEPRE
                    <IconButton>
                        <AccountCircleIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
            </div>
            <div className='circle-back1'></div>
            <div className='circle-back2'></div>
        </>
    );
}

export default Navbar;
