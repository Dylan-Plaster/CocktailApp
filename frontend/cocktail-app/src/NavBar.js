import React, { useContext } from "react";
import UserContext from "./UserContext";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
import "./Navbar.css";
const NavBar = () => {
  const history = useHistory();
  const { currUser, logout } = useContext(UserContext);
  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand href="/">Cocktail Search</NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/search">Search</NavLink>
          </NavItem>
        </Nav>
        <Nav className="" navbar>
          <NavItem>
            <NavLink to="/filter">Filter</NavLink>
          </NavItem>
        </Nav>
        {currUser ? (
          <>
            <Nav className="" navbar>
              <NavItem>
                <NavLink to="/profile">Edit</NavLink>
              </NavItem>
            </Nav>
            <Nav className="" navbar>
              <NavItem>
                <NavLink to={`/users/${currUser.username}`}>
                  {currUser.username}
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="" navbar>
              <NavItem>
                <NavLink
                  to="#"
                  onClick={() => {
                    history.push("/");
                    logout();
                  }}
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </>
        ) : (
          <>
            <Nav className="" navbar>
              <NavItem>
                <NavLink to="/signup">Sign up</NavLink>
              </NavItem>
            </Nav>
            <Nav className="" navbar>
              <NavItem>
                <NavLink to="/login">Login</NavLink>
              </NavItem>
            </Nav>{" "}
          </>
        )}
      </Navbar>
    </div>
  );
};

export default NavBar;
