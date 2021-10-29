import React from 'react'
import {Alert, Button, Form, Input, Popconfirm, Skeleton} from 'antd'
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
    const items_state = useSelector(state => state.items_state);

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
                <Form.Item label="Name" name="name" rules={[{required: true}]}>
                    <Input type="text" placeholder="Enter name here"  />
                </Form.Item>
                <Form.Item label="Code" name="code" rules={[{required: true}]}>
                    <Input type="text" placeholder="Enter code here"  />
                </Form.Item>
                <Form.Item label="remaining" name="remaining" rules={[{required: true}]}>
                    <Input type="number" placeholder="Enter current amount in store"  />
                </Form.Item>
                <Form.Item {...buttonWrapperLayout}>
                    <Button type="warning" htmlType="submit" style={{width: '100%', backgroundColor: 'deeppink', borderColor:'deeppink', color: 'white'}}>Add new item</Button>
                </Form.Item>
            </Form>
            {items_state.new_item.error && <Alert closable message="Something went wrong please try again" type="error"/>}
        </Skeleton>
    )
}

export default NewItemForm
