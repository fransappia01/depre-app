import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import '../styles/components/Navbar.css';

const Navbar2 = ({ toggleSidebar }) => {
    return (
        <>
            <div className='container-navbar'>
                <div className='menu-logo'>
                    {/* Envolviendo el IconButton con Link para navegar a "/" */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <IconButton>
                            <ArrowBack style={{ color: 'white' }} />
                        </IconButton>
                    </Link>
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

export default Navbar2;
