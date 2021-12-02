import React from 'react';
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import { Route } from 'react-router-dom'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import SearchBox from './SearchBox';
import {logout} from '../actions/userActions'
import SubMenu from './SubMenu'
import logo from '../siteImages/ex2-2-white.png'

const Styles = styled.div`
header {
  background: #000;
}
.dropdown-menu{
  background-color: #000;
}
 a.dropdown-item:hover{
  color: gold; 
  background-color: black;
 }
 a.dropdown-item{
  color: #fff; 
 }
 
.navbar-toggler-icon{
  color: #fff;
}
.navbar-brand {
  margin-right: 2rem;
}
.navbar-dark .navbar-toggler {
  color: rgba(255,255,255,.5);
  border: none;
}
img{
  width: 100px;
}


  @media only screen and (max-width: 768px) {
    .form-inline {
      padding: 20px 0;
    }
    .ml-sm-5, .mx-sm-5 {
      margin-left: 0!important;
    }
    .navbar {
      padding: 0rem 1rem!important;
    }
  }
  @media (min-width: 576px)
    // .ml-sm-5, .mx-sm-5 {
    //   margin-left: 0!important;
    // }
}
`

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin
  
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <Styles>
    <header>
      <Navbar variant='dark' expand='lg' collapseOnSelect>
        <Container>
          
          <LinkContainer to='/'>
            <Navbar.Brand>
            <img  src={logo} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle variant="light" bg="light" aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>

          <Route render={({ history }) => <SearchBox history={history} />} />

            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </header>
    <>
    <SubMenu />
    </>
    
    </Styles>
  )
}
export default Header;
