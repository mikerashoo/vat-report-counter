import React from 'react'
import { Popover, Table, Button, Card } from "antd";
import { useSelector } from 'react-redux';
import moment from "moment";  
import { toInteger } from 'lodash';  
 
function ItemSells() { 
     
    const dailySell = useSelector(state => state.dailySell);
    
    const itemSellsTableColumns = [
        {
            title: '#',
            dataIndex: 'id',
            render: (v, it, index) => <p>{toInteger(index) + 1}</p>
        },
        {
            title: 'የዕቃው አይነት',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.category_id - b.category_id
            },
            render: (i, item) => <Popover title={item.name} trigger="click" content={<Table dataSource={item.transactions} columns={transactionTableColumns} rowKey="id" />}><Button type="link">{item.name}</Button></Popover>
        },   
        {
            title: 'የተሸጠ ብዛት',
            dataIndex: 'sell_quantity',
            sorter: {
                compare: (a, b) => a.sell_quantity - b.sell_quantity
            },
        },
        {
            title: 'ጠቅላላ ብር',
            dataIndex: 'sell_price',
            render: price => <> {price} ብር</>
        },
        {
            title: 'አሁን ቀረ',
            dataIndex: 'remaining'
        },     
    ]
    
    const transactionTableColumns = [
        {
            title: 'ብዛት',
            dataIndex: 'quantity'
        },
        {
            title: 'የአንዱ ዋጋ',
            dataIndex: 'price',
            render: price => <> {price} ብር</>
        },
        {
            title: 'ጠቅላላ ዋጋ', 
            render: (trans) => <> {trans.price * trans.quantity} ብር</>
        },
        {
            title: 'ሰዓት',
            dataIndex: 'created_at',
            render: trans => <>{moment(trans).fromNow()} </>
        },   
    ] 
    
    let item_transactions = dailySell.data.item_transactions; 
    let itemsWithTransactions = item_transactions.filter(item => item.transactions.length > 0); 
    
    return (
        
            <Card title="የቀን ገብ በዕቃ አይነት">
            <Table dataSource={itemsWithTransactions} columns={itemSellsTableColumns}  
            pagination={false}
            rowKey="id" loading={dailySell.loading}  
            summary={pageData => {
                let totalQuantity = 0;
                let totalPrice = 0;
                pageData.forEach(item => { 
                    totalPrice += item.sell_price;
                    totalQuantity += item.sell_quantity;
                });
                return (
                    <>
                    <Table.Summary.Row style={{backgroundColor: 'gold'}}>
                    <Table.Summary.Cell>-</Table.Summary.Cell>
                    <Table.Summary.Cell>ጠቅላላ</Table.Summary.Cell> 
                    <Table.Summary.Cell>{totalQuantity}</Table.Summary.Cell>
                    <Table.Summary.Cell>{totalPrice} ብር</Table.Summary.Cell>
                    <Table.Summary.Cell>-</Table.Summary.Cell>
                    </Table.Summary.Row> 
                    </>
                    )
                }}
                />
                </Card>  
                )
            }
            
            export default ItemSells
            