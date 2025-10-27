import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1e40af' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hora Extra
          </Typography>
          
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ 
              backgroundColor: isActive('/') ? 'rgba(255,255,255,0.1)' : 'transparent',
              mr: 1
            }}
          >
            Home
          </Button>
          
          <Button
            color="inherit"
            onClick={() => navigate('/dashboard')}
            sx={{ 
              backgroundColor: isActive('/dashboard') ? 'rgba(255,255,255,0.1)' : 'transparent',
              mr: 1
            }}
          >
            Dashboard
          </Button>
          
          <Button
            color="inherit"
            onClick={() => navigate('/clientes')}
            sx={{ 
              backgroundColor: isActive('/clientes') ? 'rgba(255,255,255,0.1)' : 'transparent',
              mr: 1
            }}
          >
            Clientes
          </Button>
          
          <Button
            color="inherit"
            onClick={() => navigate('/perfil')}
            sx={{ 
              backgroundColor: isActive('/perfil') ? 'rgba(255,255,255,0.1)' : 'transparent',
              mr: 2
            }}
          >
            Perfil
          </Button>
          
          <Typography variant="body2" sx={{ mr: 2 }}>
            Olá, {user?.nome}
          </Typography>
          
          <Button color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
};
