import React, { useState } from 'react'
import { Skeleton, Form, Button, Input, Select, InputNumber, DatePicker } from 'antd'
import { useSelector } from 'react-redux';
import { Divider } from 'rc-menu';
import { MoneyCollectFilled } from '@ant-design/icons';
const labelCols = {
    labelCol: {span: 6},
    wrapperCOl: {span: 18}
}
export const PurchaseForm = () => {

    const items_state = useSelector(state => state.items_state);
    const [form] = Form.useForm();
    const onSubmit = transaction => {
        console.log(transaction);
    }
        const [current_quantity, setCurrentQuantity] = useState(0);
        const [current_average, setCurrentAverage] = useState(0);


        const onQuantityChange = (quantity_value) => {
            setCurrentQuantity(quantity_value);
        }

        const onAverageChange = (value) => {
            setCurrentAverage(value);
        }


    const [item_transactions, setItemTransactions] = useState([
        {
            item: null,
            quantity: 0,
            average_price: 0
        }
    ]);


    const ItemTransactionForm = () => {

        return <>
        <Form.Item label="Item" name="item_id" rules={[{required: true, message: 'Item should be selected' }]}>
                        <Select placeholder="Select item here">
                            {
                                items_state.items.data.map((item, key) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label="Quantity" name="quantity_average" >
                        <Input.Group compact>
                            <Form.Item style={{display: 'inline-block', width: '50%'}}>
                                <InputNumber type="number" placeholder="ብዛት" name="quantity" value={current_quantity} onChange={onQuantityChange} />
                            </Form.Item>
                             <Form.Item style={{display: 'inline-block', width: '50%'}}>
                                <InputNumber step="any" type="number" prefix={<span>$</span>} placeholder="price" name="average_price" onChange={onAverageChange} addonAfter={<MoneyCollectFilled />} />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item label="Total amount">
                        <Input value={current_average * current_quantity} disabled  />
                    </Form.Item>
        </>
    }
    return (
        <Skeleton loading={items_state.new_transaction.loading}>
            <Form form={form} onFinish={onSubmit} {...labelCols}>
                    <Form.Item label="Fs Number" name="fs_number">
                        <Input type="text" placeholder="Enter fs number here"  />
                    </Form.Item>
                    <Form.Item label="Reciept date" name="receipt_date">
                        <Input type="text" placeholder="Enter receipt date here" />
                    </Form.Item>
                    <Divider  />
                    {  
                    }
                <ItemTransactionForm  />
                <Button type="primary" htmlType="submit">Save purchase information</Button>
            </Form>
        </Skeleton>
    )
}


