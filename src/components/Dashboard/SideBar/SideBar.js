import React from 'react';
import { Layout, Menu } from 'antd';
import SideHeader from './SideHeader';
import SideProfile from './SideProfile';
import SideFooter from './SideFooter';


const {Sider} = Layout

const SideBar = () => {


    return (
        <div>
            <Sider>
                <div/>
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{
                height: '100vh',
                width: '20vw',
                background: '#4B88A2',
                position: 'fixed',
                boxShadow: '1px 1px 1px 1px #4B88A2',
                border: 'none'}}>
                    <SideHeader/>
                    <SideProfile/>
                    <SideFooter/>
                </Menu>
            </Sider>
        </div>
    )
}

export default SideBar;