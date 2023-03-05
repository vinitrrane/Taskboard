import React from 'react';
import '../Header.css';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

function Navbar() {
  return (
    <AppBar className='navbar' position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ textAlign: 'center' }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
