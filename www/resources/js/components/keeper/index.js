import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';
import {SideMenu, PageRoutes} from './views'
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './store';
function Keeper() {
    return ( 
        <Provider store={store}>
        <BrowserRouter>
        <PageRoutes />
        
        </BrowserRouter>
        </Provider>
        );
    }
    
    export default Keeper;
    
    if (document.getElementById('keeper_app')) {
        ReactDOM.render(<Keeper />, document.getElementById('keeper_app'));
    }
    