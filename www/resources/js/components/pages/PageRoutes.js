import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from './HomePage'
import ItemDetail from './ItemDetail'

function PageRoutes() {
    return (
            <Switch>
                <Route component={HomePage} path="/home" />
                <Route component={ItemDetail} path="/home/item_detail" />
                <Route component={HomePage} path="/" />

            </Switch>
    )
}

export default PageRoutes
