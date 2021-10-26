import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './pages/PageRoutes';
import store from './store';
import { Provider } from 'react-redux';

function AppComponent() {
    return (
        <Provider store={store}>
            <div className="container-fluid">
                <BrowserRouter>
                    <PageRoutes />
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default AppComponent;

if (document.getElementById('react_app')) {
    ReactDOM.render(<AppComponent />, document.getElementById('react_app'));
}
