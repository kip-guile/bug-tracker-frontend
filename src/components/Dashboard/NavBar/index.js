import React from 'react';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import { Button } from 'antd';

const Div = styled.div`
  padding: 3em;
  display: flex;
  justify-content: space-between;
  float: right;
  position: fixed;
  align-items: center;
  width: 80vw;
  height: 70px;
  margin-left: 20vw;
  z-index: 1;
  font-size: 1rem;
  background: #212223;

  button {
    border: none;
    color: white;
    background: #BB0A21;
    font-size: 1.2rem;
    margin-right: 5%;

    &:hover {
      border: none;
      color: white;
      background: #4B88A2;
      scale: (1:1)
    }
  }
`;

const NavBar = (props) => {

  const onLogout = () => {
    localStorage.clear()
};

    return (
        <Div>
          <h3 style={{ color: '#FFF9FB' }}>Welcome</h3>
            <h3 style={{ color: '#FFF9FB' }}>hard@coded.email</h3>
            <NavLink to='/'>
              <Button onClick={onLogout}>
                Logout
            </Button>
            </NavLink>
        </Div>
    )
}

export default NavBar