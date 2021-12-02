import React from 'react';
import styled from 'styled-components'
import {LinkContainer} from 'react-router-bootstrap';
import { Nav, NavDropdown} from 'react-bootstrap';

const Styles = styled.div`
  .subMenu{
    display: flex;
    align-items: center;
    padding-left: 50px;
    padding-top: 10px;
    //color: #000!important;
  }
  a.nav-link{
    // color: #000!important;
  }
  .eXCgoW .dropdown-menu {
    background-color: #fff;
  }
  // .dropdown-item{
  //   background-color: #fff;
  //   color: #000;
  // }
 a.dropdown-toggle.nav-link {
  text-aglin: center;
  padding-left: 20px;
}
`

const SubMenu = () => {
  return (
    <Styles>
        <Nav className='ml-auto subMenu'>
              <LinkContainer to='/search/custom%20wigs'>
                <Nav.Link>
                Custom Wigs
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/search/ready%20to%20wear'>
                  <Nav.Link>
                    Ready to Wear
                  </Nav.Link>
                </LinkContainer>
            
                <NavDropdown title="Hair Extentions">
                <LinkContainer to='/search/bundles'>
                    <NavDropdown.Item>Bundles</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/search/bundles%20deals'>
                    <NavDropdown.Item>Bundle Deals</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/search/lace%20closure'>
                    <NavDropdown.Item>Lace Closure</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/search/lace%20frontal'>
                    <NavDropdown.Item>Lace Frontal</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              
            </Nav>


    </Styles>
  )
}
export default SubMenu;
