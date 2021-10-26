import React from 'react'
import { Card, Col, Row, Tabs } from 'antd'
import '../styles/home.css'
import NewItemForm from '../views/NewItemForm';
import ItemList from '../views/ItemList';
import NewTransactionForm from '../views/NewTransactionForm';
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

                <TabPane key="1" tabKey="1" tab="የእቃ ሽያጭ">
                    <NewTransactionForm type="sell" />
                </TabPane>
                <TabPane key="2" tabKey="2" tab="የእቃ ግዥ">
                    <NewTransactionForm type="buy" />
                </TabPane>
                <TabPane key="3" tabKey="3" tab="አድስ እቃ">
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
