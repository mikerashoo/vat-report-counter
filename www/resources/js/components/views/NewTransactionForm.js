import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Skeleton, Select, message, Space} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import {  saveTransactionAction } from '../actions/itemActions';
import { MoneyCollectFilled } from '@ant-design/icons';
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

function NewTransactionForm(props) {
    const [transactionForm] = Form.useForm();
    const dispatch = useDispatch();
    const items_state = useSelector(state => state.items);
    const [items, setitems] = useState([]);
    const [current_quantity, setCurrentQuantity] = useState(0);
    const [current_average, setCurrentAverage] = useState(0);
    const [quantityPriceErrorMessage, setQuantityPriceErrorMessage] = useState();

    const onQuantityChange = (quantity_value) => {
        setCurrentQuantity(quantity_value);
    }

    const onAverageChange = (value) => {
        setCurrentAverage(value);
    }

    const onSubmit = (item) => {
        if(current_quantity == 0 || !current_quantity){
            transactionForm.setFields(
                [
                    {
                        name: 'quantity_average',
                        errors: ['እባኮ የእቃውን ብዛት በትክክል ያስገቡ']
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
                        errors: ['እባኮ ዋጋውን ብዛት በትክክል ያስገቡ']
                    }
                ]
            );
            return;
        }

        let transaction = {
            item_id: parseInt(transactionForm.getFieldValue('item_id')),
            type: props.type,
            quantity: current_quantity,
            average_price: current_average,
            total_price: current_quantity * current_average
        }

        console.log("transaction to save", transaction);
        dispatch(saveTransactionAction(transaction));
    }

    useEffect(() => {
        if(items_state.new_transaction.is_success){
            message.success({content: 'መረጃው በትክክል ተመዝግቧል።', key: 'save_item_message'});
            transactionForm.resetFields();
            setCurrentAverage(0);
            setCurrentQuantity(0);
        }
    }, [items_state.new_transaction.is_success]);

    return (
        <Skeleton loading={items_state.new_transaction.loading}>
            <div className="text-center py-2">
            {props.type == "sell" ? <b>ሽያጭ መመዝገብያ ፎርም</b> : <b>ግዥ መመዝገብያ ፎርም </b> }

            </div>
            <Form form={transactionForm} {...layout} onFinish={onSubmit}>
                <Form.Item label="እቃ" name="item_id" rules={[{required: true, message: 'የእቃው አይነት መመረጥ አለበት' }]}>
                    <Select placeholder="እቃውን እዝህ ይምረጡ">
                        {
                            items_state.items.data.map((item, key) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item label="ብዛት እና ህሳብ" name="quantity_average" >
                    <Input.Group compact>
                        <Form.Item style={{display: 'inline-block', width: '50%'}}>
                            <InputNumber type="number" placeholder="ብዛት" name="quantity" value={current_quantity} onChange={onQuantityChange} />
                        </Form.Item>
                         <Form.Item style={{display: 'inline-block', width: '50%'}}>
                            <InputNumber step="any" type="number" prefix={<span>$</span>} placeholder="የአንዱ ዋጋ" name="average_price" value={current_average} onChange={onAverageChange} addonAfter={<MoneyCollectFilled />} />
                        </Form.Item>

                    </Input.Group>

                </Form.Item>
                <Form.Item label="ጠቅላላ ድምር">
                    <Input value={current_average * current_quantity} disabled  />
                </Form.Item>
                <Form.Item {...buttonWrapperLayout}>
                    <Button type="primary" htmlType="submit" style={{width: '100%', backgroundColor: 'deeppink', color: 'white'}}>{props.type == "sell" ? "ሽያጭ መዝግብ" : "ግዥ መዝግብ"}</Button>
                </Form.Item>
            </Form>

        </Skeleton>
    )
}

export default NewTransactionForm
