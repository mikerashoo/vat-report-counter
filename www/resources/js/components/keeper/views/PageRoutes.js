import React from 'react'
import { Route, Switch } from 'react-router'
import { Daily, Stocks, LoanPayment } from '../pages'

function PageRoutes() {
    return ( 
            <Switch> 
                <Route component={Stocks} path="/keeper/stocks" />
                <Route component={Daily} path="/keeper/daily" />
                <Route component={LoanPayment} path="/keeper/loanpayments" />
                <Route component={Stocks} path="/keeper" />
            </Switch> 
    )
}

export default PageRoutes
