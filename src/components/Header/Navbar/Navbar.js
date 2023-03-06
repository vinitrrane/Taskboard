import React from 'react';
import '../Header.css';
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Avatar, MenuItem, Menu } from '@mui/material';
import AppLogo from '../../../assets/img/logo.png';

const settings = ['Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar className='navbar' position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <img src={AppLogo} alt='app-logo' className='navbar-logo' />
          <Typography
            className='navbar-title'
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 1,
              fontWeight: 700,
              textDecoration: 'none',
            }}>
            TASKBOARD
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Vinit Rane' src='/static/images/avatar/2.jpg' />
            </IconButton>

            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
