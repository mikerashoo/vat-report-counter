import React from 'react'
import {Menu} from 'antd'; 
import { NavLink } from 'react-router-dom'
import {} from '@ant-design/icons'
function SideMenu() {
    return ( 
        <div> 
        <Menu mode="inline" defaultOpenKeys={['contents', 'stocks', 'reports']} style={{height: '100vh'}}> 
        <Menu.SubMenu title="Content Management" key="contents">
        <Menu.Item key="users">
        <NavLink to="/superadmin/users"> Users </NavLink>
        </Menu.Item> 
        <Menu.Item key="items">
        <NavLink to="/superadmin/categories"> Items </NavLink>
        </Menu.Item> 
        
        </Menu.SubMenu> 
        <Menu.SubMenu title="Manage Stock" key="stocks">
        <Menu.Item>
        <NavLink to="/superadmin/stocks"> Add to stock </NavLink>
        </Menu.Item> 
        
        </Menu.SubMenu>  

        <Menu.SubMenu title="Reports" key="reports">
        <Menu.Item>Daily</Menu.Item> 
        <Menu.Item>Monthly</Menu.Item>
        </Menu.SubMenu> 
        </Menu> 
        </div>
        )
    }
    
    export default SideMenu
    
    