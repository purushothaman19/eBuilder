import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './Navbar.css';

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const home = window.location.pathname==='/';
  // console.log(home);

  return (
    <AppBar position="static" style={{ background:'transparent', boxShadow:'none', color:'black', padding:'5% 5% 2%' }} >
      <Container maxWidth="xl" style={{ padding:'0'}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
            id='brand'
          >
            ExamBuilder
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} stlye={{color:'black'}} className='menubtns'>
                {(
                  home ? 
                   <a href='#features'><Typography textAlign="center" stlye={{color:'black'}}> Features </Typography></a>
                  :
                   <a href='/'><Typography textAlign="center" stlye={{color:'black'}}> Home </Typography></a>
                )}
              </MenuItem>


            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
            }}
            style={{
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            ExamBuilder
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              {(
                  home ? 
                   <a href='#features' style={{ textDecoration:'none' }}> 
                    <Button
                      sx={{ my: 2, color: 'black', display: 'block' }}
                      style={{ textTransform:'capitalize' }}
                      className='menubtn-l'
                    >
                      Features
                    </Button>
                  </a>
                  :
                  <a href='/' style={{ textDecoration:'none' }}> 
                    <Button
                      sx={{ my: 2, color: 'black', display: 'block' }}
                      style={{ textTransform:'capitalize' }}
                      className='menubtn-l'
                    >
                      Home
                    </Button>
                  </a>
              )}
              
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={ window.localStorage.getItem('dp') } />
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
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
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu} stlye={{color:'black'}} className='menubtns'>
                  <a href='/dashboard' style={{textDecoration:'none', width:"100%"}}> <Typography textAlign="center" stlye={{color:'black'}}> Dashboard </Typography> </a>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu} stlye={{color:'black'}} className='menubtns'>
                  <Button onClick={props.logout} style={{ textTransform:'capitalize' }} > <Typography textAlign="center" stlye={{color:'black'}}> Logout </Typography> </Button>
                </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
