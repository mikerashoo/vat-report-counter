import React from 'react'
import {Alert, Button, Form, Input, Skeleton} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { saveItemAction } from '../actions/itemActions';
// import {} from '../actions/itemActions'
const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
}

const buttonWrapperLayout = {
    wrapperCol: {
        offset: 4,
        span: 20
    }
}

function NewItemForm() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const items_state = useSelector(state => state.items);

    const onSubmit = (item) => {
        dispatch(saveItemAction(item));
        //TO DO reset only when saving fails
        if(!(items_state.new_item.loading || items_state.new_item.error)){
            form.resetFields();
        }
    }

    return (
        <Skeleton loading={items_state.new_item.loading}>
            <Form form={form} {...layout} onFinish={onSubmit}>
                <Form.Item label="ስም" name="name" rules={[{required: true}]}>
                    <Input type="text" placeholder="ስም እዝህ ይመዝግቡ"  />
                </Form.Item>
                <Form.Item label="ኮድ" name="code" rules={[{required: true}]}>
                    <Input type="text" placeholder="ክድ እዝህ ይመዝግቡ"  />
                </Form.Item>
                <Form.Item label="ቀር" name="remaining" rules={[{required: true}]}>
                    <Input type="number" placeholder="አሁን ቀር ያስገቡ"  />
                </Form.Item>
                <Form.Item {...buttonWrapperLayout}>
                    <Button type="warning" htmlType="submit" style={{width: '100%', backgroundColor: 'deeppink', color: 'white'}}>እቃውን መዝግብ</Button>
                </Form.Item>
            </Form>
            {items_state.new_item.error && <Alert closable message="መረጃውን መምዝገብ አልተቻለም እባከው ደግመው ይሞክሩ" type="error"/>}
        </Skeleton>
    )
}

export default NewItemForm
