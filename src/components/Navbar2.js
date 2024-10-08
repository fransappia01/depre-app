import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Navbar.css';

const Navbar2 = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className='container-navbar'>
                <div className='menu-logo'>
                    {/* Usando navigate para volver a la página anterior */}
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBack style={{ color: 'white' }} />
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

export default Navbar2;
