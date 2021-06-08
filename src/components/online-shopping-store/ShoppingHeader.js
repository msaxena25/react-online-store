import React, { useState } from 'react';
import { BsBag } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Input, Button } from 'reactstrap';
import { searchProduct } from '../../redux/action';

const ShoppingHeader = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const totalAddedProductsInCart = useSelector((state) => state.products.cartProducts.length);

  const toggle = () => setIsOpen(!isOpen);

  const onClickCart = () => {
    props.history.push('/productcheckout');
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const onSearchClick = () => {
    dispatch(searchProduct(searchValue)); // Either you can call a function from here or direct pass action type and payload
  };
  return (
    <div>
      <Navbar className='navbar-header' light expand='md'>
        <NavbarBrand className='txt-color-white'>Online Shop </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink className='txt-color-white'>Category</NavLink>
            </NavItem>
            <NavItem style={{ width: '30rem' }}>
              <Input type='search' value={searchValue} name='search' id='exampleSearch' placeholder='Search Products' onChange={onSearch} />
            </NavItem>
            <NavItem style={{ marginLeft: '2px' }}>
              <Button color='warning' onClick={onSearchClick}>
                Search
              </Button>
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
