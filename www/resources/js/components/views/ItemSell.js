import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Skeleton, Select, message, Space, DatePicker, Col, Row} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import {  saveTransactionAction } from '../actions/itemActions';
import { MoneyCollectFilled } from '@ant-design/icons';
import moment from 'moment'
const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
}

const buttonWrapperLayout = {
    wrapperCol: {
        offset: 6,
        span: 18
    }
}

function ItemSell(props) {
    const [transactionForm] = Form.useForm();
    const dispatch = useDispatch();

    const items_state = useSelector(state => state.items_state);
    const [current_quantity, setCurrentQuantity] = useState(0);
    const [current_average, setCurrentAverage] = useState(0);

    const onQuantityChange = (quantity_value) => {
        setCurrentQuantity(quantity_value);
    }

    const onAverageChange = (value) => {
        setCurrentAverage(value);
    }

    const onSubmit = (item) => {
        if(current_quantity > items_state.selected_item?.remaining){
            transactionForm.setFields(
                [
                    {
                        name: 'quantity_average',
                        errors: ['Quantity greater than remaining amount']
                    }
                ]
            );
            return;
        }
        if(current_quantity == 0 || !current_quantity){
            transactionForm.setFields(
                [
                    {
                        name: 'quantity_average',
                        errors: ['Please enter quantity']
                    }
                ]
            );
            return;
        }

        if(current_average == 0 || !current_average){
            transactionForm.setFields(
                [
                    {
                        name: 'quantity_average',
                        errors: ['Please enter valid quantity and price']
                    }
                ]
            );
            return;
        }

        let transaction = {
            item_id: parseInt(items_state.selected_item?.id),
            type: "sell",
            quantity: current_quantity,
            average_price: current_average,
            total_price: current_quantity * current_average
        }
        dispatch(saveTransactionAction(transaction));
    }

    useEffect(() => {
        if(items_state.new_transaction.is_success){
            message.success({content: "sell information saved successfully!", key: 'save_item_message'});
            transactionForm.resetFields();
            setCurrentAverage(0);
            setCurrentQuantity(0);
        }
    }, [items_state.new_transaction.is_success]);


    return (
        <Skeleton loading={items_state.new_transaction.loading}>

            <Form form={transactionForm} {...layout} onFinish={onSubmit}>

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
                <Form.Item {...buttonWrapperLayout}>
                    <Button type="primary" htmlType="submit" style={{width: '100%', backgroundColor: 'deeppink', borderColor:'deeppink', color: 'white'}}>
                        {`Save ${items_state.selected_item?.name} sell`}
                    </Button>
                </Form.Item>
            </Form>

        </Skeleton>
    )
}

export default ItemSell
