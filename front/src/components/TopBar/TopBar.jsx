import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Exit from '@material-ui/icons/ExitToAppRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {
  styles,
  SideMenu,
  LinksWrapper,
  CustomLink,
  CloseWrapper
} from './styles';
import { Button, Fab } from '@material-ui/core';
import Signup from './Signup';
import Login from './Login';
import { logout } from '../../store/auth/actions';
import { MenuRounded } from '@material-ui/icons';
import CloseRounded from 'react-icons/lib/io/close-round';
import Logo from 'react-icons/lib/ti/flow-merge';
import socket from '../../utils/sockets';
import { withRouter } from 'react-router-dom';

export class TopBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    signupOpen: false,
    loginOpen: false,
    menuOpen: false
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleClick = name => () => {
    this.setState({ [name]: !this.state[name] });
    if (this.state.mobileMoreAnchorEl) {
      this.handleMobileMenuClose();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.auth !== this.props.auth.auth) {
      if (!nextProps.auth.auth) {
        this.props.history.push('/');
        socket.emit('user_disconnected', this.props.auth.currentUser);
      } else {
        this.props.history.push('/feed');
        socket.emit('user_connected', this.props.auth.currentUser);
      }
    }
  }

  componentDidMount = () => {
    socket.emit('user_connected', this.props.auth.currentUser);
  };

  render() {
    const {
      anchorEl,
      mobileMoreAnchorEl,
      signupOpen,
      loginOpen,
      menuOpen
    } = this.state;
    const { classes, auth } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = auth.auth && auth.currentUser && (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link to={`/user/${auth.currentUser._id}`}>
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = !auth.auth ? (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClick('signupOpen')}>
          <Typography color='primary'>Sign up</Typography>
        </MenuItem>
        <MenuItem onClick={this.handleClick('loginOpen')}>
          <Typography>Login</Typography>
        </MenuItem>
      </Menu>
    ) : (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color='primary'>
            <Badge badgeContent={4} color='secondary'>
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color='primary'>
            <Badge badgeContent={11} color='secondary'>
              <NotificationsIcon color='primary' />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <Link to={`/user/${auth.currentUser._id}`}>
          <MenuItem>
            <IconButton>
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Link>
        <MenuItem onClick={this.props.logout}>
          <IconButton>
            <Exit />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Menu>
    );
    const links = [
      { name: 'All users', path: '/users' },
      { name: 'Feed', path: '/feed' },
      { name: 'Messages', path: '/messages' },
      { name: 'Home', path: '/' }
    ];
    const renderSideMenu = (
      <SideMenu
        color='primary'
        onClick={this.handleClick('menuOpen')}
        open={menuOpen}
        className='primaryText'
      >
        <IconButton onClick={this.handleClick('menuOpen')}>
          <MenuRounded />
        </IconButton>
        {menuOpen && (
          <LinksWrapper>
            <CloseWrapper>
              <IconButton className='primaryText'>
                <CloseRounded className='primaryText' />
              </IconButton>
            </CloseWrapper>
            {links.map(link => (
              <CustomLink key={link.path}>
                <NavLink exact activeClassName='activeLink' to={link.path}>
                  {link.name}
                </NavLink>
              </CustomLink>
            ))}
          </LinksWrapper>
        )}
      </SideMenu>
    );

    return (
      <div className={classes.root}>
        <Signup open={signupOpen} close={this.handleClick('signupOpen')} />
        <Login open={loginOpen} close={this.handleClick('loginOpen')} />
        <AppBar className={classes.appBar} position='static'>
          <Toolbar>
            {auth.auth && renderSideMenu}
            <Link to={auth.auth ? '/feed' : '/'}>
              <Typography
                className={classes.title}
                variant='h5'
                color='primary'
                noWrap
              >
                <Logo className='middleIcon' style={{ padding: '0 0.2em' }} />
                Connector{' '}
              </Typography>
            </Link>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {!auth.auth ? (
                <Fragment>
                  <Button
                    onClick={this.handleClick('loginOpen')}
                    className={classes.button}
                  >
                    Login
                  </Button>
                  <Fab
                    onClick={this.handleClick('signupOpen')}
                    variant='extended'
                    color='primary'
                    className={classes.button}
                  >
                    <span className='whiteText'>Sign up</span>
                  </Fab>
                </Fragment>
              ) : (
                <Fragment>
                  <IconButton>
                    <Badge badgeContent={4} color='secondary'>
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton>
                    <Badge badgeContent={17} color='secondary'>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-haspopup='true'
                    onClick={this.handleProfileMenuOpen}
                  >
                    <AccountCircle />
                  </IconButton>
                </Fragment>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup='true'
                onClick={this.handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(TopBar))
);
