import React from 'react'
import SideBar from './SideBar/SideBar'
import NavBar from './NavBar'
import Welcome from '../Welcome/index'

const Dashboard = () => {


    return (
        <div>
            <SideBar/>
            <NavBar/>
            <Welcome/>
        </div>
    )
}

export default Dashboard