import React from 'react'
import { Card, Col, Row, Tabs } from 'antd'
import '../styles/home.css'
import NewItemForm from '../views/NewItemForm';
import ItemList from '../views/ItemList';
import NewTransactionForm from '../views/NewTransactionForm';
import { PurchaseForm } from '../views/PurchaseForm';
const {TabPane} = Tabs;
function HomePage() {

    return (
        <div className="px-4">

        <Row gutter={[16, 16]}>
        <Col span={16} id="item_list_area">
            <ItemList />
        </Col>
        <Col span={8} id="actions_area">

        <div className="card-container">
            <Tabs defaultActiveKey={1} centered tabBarStyle={{ padding: 5, backgroundColor: '#1890ff'}} type="card">

                <TabPane key="1" tabKey="1" tab="Register sell">
                    <NewTransactionForm type="sell" />
                </TabPane>
                <TabPane key="2" tabKey="2" tab="Purchase">
                    <PurchaseForm type="buy" />
                </TabPane>
                <TabPane key="3" tabKey="3" tab="New Item">
                    <NewItemForm  />
                </TabPane>
            </Tabs>
        </div>

        </Col>
        </Row>
        </div>
        )
    }

    export default HomePage
