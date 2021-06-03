import React, { useState } from 'react';
import { BsBag } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Input, Button } from 'reactstrap';

const ShoppingHeader = (props) => {
  console.log('header', props);
  const [isOpen, setIsOpen] = useState(false);
  const totalAddedProductsInCart = useSelector((state) => state.products.cartProducts.length);

  const toggle = () => setIsOpen(!isOpen);

  const onClickCart = () => {
    console.log('click', props);
    props.history.push('/productcheckout')
  };

  return (
    <div>
      <Navbar className='navbar-header' light expand='md'>
        <NavbarBrand className='txt-color-white'>
          Online Mobile Shop{' '}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink className='txt-color-white'>Category</NavLink>
            </NavItem>
            <NavItem style={{ width: '30rem' }}>
              <Input type='search' name='search' id='exampleSearch' placeholder='Search Mobile' />
            </NavItem>
            <NavItem style={{ marginLeft: '2px' }}>
              <Button color='warning'>Search</Button>
            </NavItem>
          </Nav>
          <div className='txt-color-white'>User</div>
          <div onClick={onClickCart} className='bag txt-color-white'>
            <BsBag></BsBag>
            <sup>
              <span className='badge'>{totalAddedProductsInCart}</span>
            </sup>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default ShoppingHeader;
