import React, { useState } from 'react'
import { Card,Form, Input, Checkbox, Button, Radio } from "antd";
import { useDispatch } from 'react-redux';
import { saveCategoryAction } from "../actions/categoryActions";
function NewItemCategory(props) {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [unit, setUnit] = useState();

    const onNameChange = (evt) => {
        setName(evt.target.value);
    }

    const onUnitChange = (evt) => { 
        setUnit(evt.target.value);
    }

    const handleOnSubmit = () => {
        let category = {
            name,
            unit
        }; 
        dispatch(saveCategoryAction(category));
    }

    return (
        <Card bordered hoverable title="Add Category" loading={props.categories.loading} style={{backgroundColor: 'whitesmoke'}}> 
        <Form onSubmit={handleOnSubmit}>
        <Form.Item label="Name" name="name" rules={[{required: true}]}>
        <Input placeholder="Enter name here" onChange={onNameChange}/>
        </Form.Item>  
        <Form.Item label="Units">
        <Radio.Group onChange={onUnitChange}>
        {props.units.data.map((unit, u) => <Radio value={unit.id} key={u}>{unit.name} </Radio>)  
        }
        </Radio.Group>
        </Form.Item>  
        <Button type="primary" onClick={handleOnSubmit} >Save Item Category</Button>
        </Form>
        </Card>
    )
}

export default NewItemCategory
