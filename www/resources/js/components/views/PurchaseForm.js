import React, { useEffect, useState } from 'react'
import { Skeleton, Form, Button, Input, Select, InputNumber, DatePicker, Card, Table, message, Row, Col } from 'antd'
import { useSelector } from 'react-redux';
import { ClearOutlined, MinusCircleFilled, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Column from 'rc-table/lib/sugar/Column';
import moment from 'moment'
const labelCols = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
}

const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
export const PurchaseForm = () => {

    const items_state = useSelector(state => state.items_state);
    const [form] = Form.useForm();
    const [transaction_form] = Form.useForm();
    const [total, setTotal] = useState(0);
    const [item_transactions, setItemTransactions] = useState([]);

    const [current_transaction, setCurrentTransaction] = useState(null);


    const onSubmit = transaction => {
        if(!validateTransactionForms()){
            return;
        }
        console.log(transaction);
    }


    const validateTransactionForms = () => {
        let is_valid = true;
        item_transactions.forEach(trans => {
            if(trans.item_id == null || trans.quantity == 0 || trans.average_price == 0){
                is_valid = false;
                message.warning({key: 'invalid_transaction', content: "Please fill all transactions first"});
                return;
            }
        });

        return is_valid;
    }

    const addItemTransaction = (transaction) => {
        let _selected_item = items_state.items.data.find(item => item.id == transaction.item_id);
        let _new_transaction = {
            ...transaction,
            key: moment().valueOf(),
            item_name: _selected_item.name
        }

        setItemTransactions([...item_transactions, _new_transaction]);
        message.success({content: 'Item added', key: 'item_purchase'});
        transaction_form.resetFields();
    }


    const removeTransaction = key => {
        setItemTransactions([...item_transactions.filter(trans => trans.key != key)]);
        message.warning({content: 'Item removed', key: 'item_purchase'});
    }


    const ItemTransactionForm = () => {
        return <Card type="inner" style={{marginTop: 10}}>
            <Form layout="inline" form={transaction_form} onFinish={addItemTransaction}>
                    <Form.Item label="Item" rules={[{required: true, message: 'Item should be selected' }]} name="item_id">
                        <Select placeholder="Select item here" style={{width: '100%'}}>
                            {
                                items_state.items.data.map((item, key) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="quantity" rules={[{required: true, message: 'Quantity can\'t be empty ' }]} >
                        <InputNumber type="number" min="0" placeholder="Quanity"/>
                    </Form.Item>
                    <Form.Item name="average_price" rules={[{required: true, message: 'Average price can\'t be empty ' }]}>
                        <InputNumber step="any" type="number" placeholder="Average price"/>
                    </Form.Item>
                    <Form.Item>
                    <Button type="dashed" htmlType="submit" icon={<PlusOutlined />}>
                        Add
                        </Button>
                    </Form.Item>
            </Form>
        </Card>
    }



    return (
        <Skeleton loading={items_state.new_transaction.loading}>
            <Row>
                <Col span={8}>
                    <Form form={form} onFinish={onSubmit} {...labelCols}>

                        <Form.Item label="Fs Number" name="fs_number">
                            <Input type="text" placeholder="Enter fs number here"  />
                        </Form.Item>
                        <Form.Item label="Reciept date" name="receipt_date">
                            <Input type="text" placeholder="Enter receipt date here" />
                        </Form.Item>


                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" disabled={item_transactions.length == 0}>Save purchase information</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={15} offset={1}>
                    <Table dataSource={item_transactions} rowKey="key" size="small" showHeader={false} bordered >
                        <Column key="key" dataIndex="key" render={(key, item) => <>
                            <Button type="text" style={{color: 'red'}} onClick={() =>removeTransaction(key)}>
                                <MinusCircleOutlined />
                            </Button>
                        </>}/>
                        <Column dataIndex="item_name" key="item_name" title="Name" />
                        <Column dataIndex="quantity" key="quantity" title="Quantity"/>
                        <Column dataIndex="average_price" key="average_price" title="Average price" />
                        <Column title="Total" key="total" render={(trans) => <>{trans.quantity * trans.average_price}</>}/>
                    </Table>
                        {

                        ItemTransactionForm()
                        }

                </Col>
            </Row>

        </Skeleton>
    )
}


