import React, { useState, useRef } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { Link as RRLink } from "react-router-dom";

export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const ref1 = useRef();
  const links = [["/deposit", "Deposit"],
  ["/withdrawal", "Withdrawal"],
  ["/credit-change","Change credit"],
  ["/transfer", "Transfer"]]


  const createNavItem = (link, text) => (
    <NavItem>
      <NavLink tag={RRLink} to={link}>
        {text}
      </NavLink>
    </NavItem>
  )

  const createDropDown = (link, text) => (
    <DropdownItem key={link} tag={RRLink} to={link}>
      {text}
    </DropdownItem>
  )

  return (
    <div>
      <Navbar
        color="light"
        expand="md"
        light
      >
        <NavbarBrand tag={RRLink} to="/">
          Home
        </NavbarBrand>

        <NavbarToggler onClick={() => setOpenNav(!openNav)} />

        <Collapse isOpen={openNav} ref={ref1} navbar>
          <Nav
            className="me-auto"
            navbar
          >
            {createNavItem("/add", "Add user")}

            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                User Actions
              </DropdownToggle>
              <DropdownMenu>
                {links.map(val => createDropDown(val[0], val[1]))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

        </Collapse>
      </Navbar>
    </div>
  )
}
