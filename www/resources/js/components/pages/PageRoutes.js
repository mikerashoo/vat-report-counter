import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from './HomePage'
import ItemDetail from './ItemDetail'
import { ReportDetail } from './ReportDetail'
import Reports from './Reports'

function PageRoutes() {
    return (
            <Switch>
                <Route component={HomePage} path="/home" />
                <Route component={ItemDetail} path="/home/item_detail" />
                <Route component={Reports} path="/reports" />
                <Route component={ReportDetail} path="/report_detail" />
                <Route component={HomePage} path="/" />

            </Switch>
    )
}

export default PageRoutes
