import { Card, Col, Row, Table, Button, Empty, Avatar, message, Modal, Input, Popconfirm, PageHeader, Typography, Divider, Form, InputNumber } from 'antd';
import CreatableSelect from "react-select/creatable";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocksAction, fetchTransactionsAction, showLoanModalAction, addNewTransactionAction, changeTransactionAction, removeTransactionAction, saveNewSellAction, hideLoanModalAction, clearLoanAction, fetchCustomersAction} from "../actions/stockActions";
import { CloseCircleFilled } from "@ant-design/icons";  
import werkama from "../imgs/werkama.png"; 
import { ItemRemaining, ItemWrapper } from "../keeper-styles";
import { toInteger, toNumber, startsWith } from "lodash"; 
import { NavLink } from 'react-router-dom';
import LoanModal from '../views/keeper/LoanModal';
    
    function Stocks() {
        const dispatch = useDispatch();
        const stocks = useSelector(state => state.stocks); 
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [customer, setCustomer] = useState();
        const [paid, setPaid] = useState(0);
        
        let transactions_total = 0;
        const customer_options = [];
        
        useEffect(() => {
            dispatch(fetchStocksAction());
            dispatch(fetchTransactionsAction());
            dispatch(fetchCustomersAction());            
        }, [dispatch]);
        
        
        const onTransactionInputChange = (evt, trans) => {  
            let name = evt.target.name;
            let value = evt.target.value;
            
            if(name == "quantity" && trans.item.remaining < value){
                message.error('error'); 
                evt.preventDefault();
            }
            
            let transaction = {
                ...trans,
                [name]: toNumber(value)    
                
            };
            dispatch(changeTransactionAction(transaction));
            
        }
        
        const addTransaction = item => {
            if(item.remaining == 0){
                message.error('ስቶር ላይ ምንም የለም!');
                return;
            }
            let is_exist = false;
            stocks.data.transactions.forEach(transaction => {
                if(transaction.item.id == item.id){
                    is_exist = true;
                }
            });
            if(is_exist){
                message.warning('ዕቃው ተመርጥዋል');
                return;
            }
            let transaction = {
                item,
                price: item.price,
                quantity: 1,
            }
            dispatch(addNewTransactionAction(transaction));
        }
        
        const removeFromTransaction = transact => {
            dispatch(removeTransactionAction(transact));
        }
        
        const onConfirmSell = () => {
            let transactions = [];
            let errors =[];
            let loan = stocks.data.loan ? {
                paid: stocks.data.loan.paid,
                customer_id: stocks.data.loan.user.id
            } : null;
            
            stocks.data.transactions.forEach(transact => {
                if(transact.price <= 0){
                    errors.push(`${transact.item.name} ሀሳቡ ከ0 በታች ነው እባኮ ያስተካክሉ፡፡`);
                }
                transactions.push({
                    item_id: transact.item.id,
                    price: transact.price,
                    quantity: transact.quantity
                })
            });
            
            if(errors.length != 0){
                message.error(`ከ0 በታች የገባ ህሳብ አለ፡፡ እባኮ ያስተካክሉ፡፡`);
                return;
            }
            
            if(stocks.data.loan && stocks.data.loan.paid >= transactions_total){
                message.error('ብድር የተክፈለ ከአጠቃላይ ድምር ይበልጣል እባኮ ያስተካክሉ፡፡');
                return;
            }
            
            let sell = {
                total: transactions_total,
                user_id: window.user.id,
                transactions,
                customer,
                paid: customer ? paid : transactions_total
            } 
            
            dispatch(saveNewSellAction(sell));
            dispatch(fetchStocksAction());
            dispatch(fetchCustomersAction());            
            setCustomer(null);
        }
        
        stocks.data?.transactions.forEach(trans => {
            let trans_total = trans.price * trans.quantity;
            transactions_total += trans_total; 
        }); 
        
        stocks.data.customers.forEach(customer => {
            customer_options.push({value: customer.id, label: customer.name});
        });

        
        const onCustomerChange = (_customer, action) => { 
            if(!customer){
                setPaid(transactions_total);
            }            

            setCustomer(_customer);
        } 
        
        const onPaidChange = (evt) => {
            let value = evt.target.value;
            if(value > transactions_total){
                message.error('ክጠቅላላ ዋጋ በላይ አስገብተዋል!');
                return;
            }
            setPaid(value);
        }

        let categories_list = stocks.data ? stocks.data.categories : [];

        const onSearchItem = (evt) => {

            let value = evt.target.value;
                categories_list = stocks.data.categories.filter(category => category.name.startsWith(value) == 1); 
                console.log(categories_list);
        }
        
        return (
            <div>
            <PageHeader title="የቀን ሽያጭ መመዝገብያ" extra={[<NavLink key="rep" to="/keeper/daily"><Button>የቀን ረፖርት</Button></NavLink>,
            <NavLink key="loan" to="/keeper/loanpayments"><Button>ብድር መክፈያ</Button></NavLink>]} />
            <Row>
            <Col span={18} style={{height: '100%'}}>
            
            {
                categories_list.map((category, c) => 
                <Card bordered loading={stocks.data?.loading} 
                headStyle={{backgroundColor: '#eef'}} title={category.name} key={c} style={{margin: 30}}>
               
                <Row>
                {
                    category.items.map((item, i) => item.status == 1 ? <Col span={7} offset={1} className="text-center mb-3" key={i}>
                    <Card hoverable onClick={() => addTransaction(item)}>
                    
                    <Avatar src={"http://127.0.0.1:8000/images/items/" + item.logo_name} style={{width: 100, height: 100}} shape="circle"/>
                    <h4> {item.name} </h4>
                    <ItemRemaining> {item.remaining} ቀሪ</ItemRemaining>
                      
                    </Card>
                    </Col> : <></>)
                }
                </Row>
                </Card>)
            }
            </Col>
            <Col span={6}>
            <Card hoverable loading={stocks.data?.loading} bordered headStyle={{backgroundColor: '#eef'}} title="አሁን በመሽጥ ላይ" style={{marginTop: 30}}>
            {stocks.data && stocks.data.transactions.length ?
                <>
                <>
                {
                    stocks.data.transactions.map((transaction, t) => <div key={t} >
                    <Divider orientation="left">
                    {transaction.item.name} <span style={{cursor: 'pointer'}} onClick={() => removeFromTransaction(transaction)}> <CloseCircleFilled /> </span> 
                    </Divider>
                    
                    <div style={{marginTop: 10}}>
                    <Input placeholder="0" type="number" defaultValue={transaction.quantity} name="quantity" onChange={(evt) => onTransactionInputChange(evt, transaction)} addonBefore="ብዛት" style={{marginBottom: 10, width: '50%'}}/>
                    <Input placeholder="0.0" defaultValue={transaction.price} addonBefore="የአንዱ ዋጋ" min="1" onChange={(evt) => onTransactionInputChange(evt, transaction)} name="price" style={{marginBottom: 10, width: '50%'}}/>
                    <Input addonBefore="ጠቅላላ ዋጋ" value={transaction.quantity * transaction.price + " ብር"} style={{marginBottom: 10}} disabled/>
                    
                    </div>
                    </div>)
                } 
                <Divider>{transactions_total} ብር</Divider>
                
                </>  
                
                <Card bodyStyle={{backgroundColor: '#efe'}} style={{marginBottom: 20}}>
                <div>
                <CreatableSelect style={{margin: 5}} 
                options={customer_options}
                onChange={onCustomerChange} 
                isClearable
                /> 
    
                
                <Input type="number" value={customer ? paid : transactions_total} disabled={!customer} addonAfter="ብር የተክፈለ" style={{margin: 5}} onChange={onPaidChange}/>  
                
                <Input value={customer ? transactions_total - paid : 0} disabled addonAfter="ብር ቀር"  style={{margin: 5}}/> 
                </div>
                
                </Card>
                <Popconfirm title="እርገጠኛ ኖት ሽያጩ ይመዝገብ?" okText="አዎ እርግጠኛ ነኝ!" cancelText="አይ ይቅር!" onConfirm={() => onConfirmSell()}>
                <Button type="primary" size="medium" style={{width: '100%'}} >ሽያጭ መዝግብ</Button> 
                </Popconfirm>
                </>
                : <> <Empty /> </> }
                </Card>
                </Col>
                </Row>
                </div>
                )
            }
            
            export default Stocks; 