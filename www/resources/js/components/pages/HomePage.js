import React, { useEffect, useState } from 'react'
import { Button, Card, Col, DatePicker, Descriptions, Input, Modal, PageHeader, Popconfirm, Row, Switch } from 'antd'
import '../styles/home.css'
import NewItemForm from '../views/NewItemForm';
import ItemList from '../views/ItemList';
import NewTransactionForm from '../views/NewTransactionForm';
import { PurchaseForm } from '../views/PurchaseForm';
import { CheckCircleOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { getStartingDateAction, hideItemPurchaseAction, hideNewItemModalAction, showItemPurchaseAction, showNewItemModalAction } from '../actions/itemActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { saveReportAction } from '../actions/reportActions';
const {RangePicker} = DatePicker;
function HomePage() {
    const items_state = useSelector(state => state.items_state);
    const dispatch = useDispatch();
    const [showPriceDetail, setShowPriceDetail] = useState(false);
    const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getStartingDateAction());
    }, []);


    const saveReport = () => {
        const total = getTotals();
        const report = {
            starting_date: items_state.starting_date,
            end_date: endDate,
            total_buy: total.buy_total,
            total_sell: total.sell_total,
            item_count: items_state.items.data.length
        }
        dispatch(saveReportAction(report));
    }

    const getTotals = () => {
        let buy_count = 0;
        let buy_total = 0;
        let sell_count = 0;
        let sell_total = 0;
        let total_remaining = 0;
        items_state.items.data.forEach(item => {
            buy_count += item.buy_count;
            buy_total += item.buy_amount;
            sell_count += item.sell_count;
            sell_total += item.sell_amount;
            total_remaining += parseInt(item.remaining);
        });

        return {
            buy_count,
            buy_total,
            sell_count,
            sell_total,
            total_remaining
        }
    }


    const renderContent = (column = 3) => (

        <Descriptions size="small" column={3}>
            <Descriptions.Item>
            <DatePicker key="1"/>
            <RangePicker key="2" style={{marginLeft: 20}}/>
            </Descriptions.Item>

            <Descriptions.Item>
            <Popconfirm
                title="Are you sure you want to save report?"
                cancelText="Cancel"
                okText="Yes save!"
                onConfirm={saveReport}>
                <Button type="primary" style={{marginLeft: 20}}><CheckCircleOutlined  /> Report current term</Button>
                </Popconfirm>
            </Descriptions.Item>

            <Descriptions.Item>
            <div style={{display: 'flex', width: '-webkit-fill-available',justifyContent: 'flex-end', color: 'green'}}>
                <b>Last report {moment(items_state.starting_date).format("DD/MM/YYYY")} </b>
            </div>
            </Descriptions.Item>
        </Descriptions>
    )

    const Content = ({ children }) => (
        <div className="content">
          <div className="main">{children}</div>
        </div>
    );



    return (
        <div className="px-4">
            <PageHeader
                ghost={false}
                title={<>Items transactions from last report </>}
                extra={[
                    <span key="1"> Show prices <Switch size="small" checked={showPriceDetail} onChange={() => setShowPriceDetail(!showPriceDetail)}/></span>,
                    <Button key="3" onClick={() => dispatch(showItemPurchaseAction())}> <PlusOutlined  /> Purchase Information</Button>,
                    <Button key="4" type="primary" onClick={() => dispatch(showNewItemModalAction())}><PlusOutlined  /> New Item </Button>,
                ]}
                >
                <Content >{renderContent()}</Content>

            </PageHeader>
            <ItemList showPriceDetail={showPriceDetail} getTotals={getTotals}/>

            <Modal
                visible={items_state.is_new_item_modal_visible}
                title="New item Form"
                footer={false} destroyOnClose={true} onCancel={() => dispatch(hideNewItemModalAction())} >
                <NewItemForm  />
            </Modal>

            <Modal
                visible={items_state.is_purchase_information_modal_visible}
                title="Purchase items form"
                footer={false} destroyOnClose={true} onCancel={() => dispatch(hideItemPurchaseAction())}
                width={'80%'}
            >
                <PurchaseForm  />
            </Modal>

        </div>
        )
    }

    export default HomePage
