import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Navbar.css';

const Navbar3 = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        const confirmExit = window.confirm("¿Está seguro que quiere salir de la sala?");
        if (confirmExit) {
            navigate('/'); // Redirige a la página principal
        }
    };

    return (
        <>
            <div className='container-navbar'>
                <div className='menu-logo'>
                    <IconButton onClick={handleBackClick}>
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

export default Navbar3;
