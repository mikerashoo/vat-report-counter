import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Card, Button, Input, List } from "antd";
import { saveUnitAction, deleteUnitAction } from '../actions/unitActions';


function Units(props) {
    const dispatch = useDispatch(); 
    const [unit, setUnit] = useState('');
    
    
    const onChange = (ev) => {
        setUnit(ev.target.value);
    }
    
    const handleOnPressEnter = () => { 
        dispatch(saveUnitAction(unit));
    }
    
    const handleDelete = (unit) => { 
        dispatch(deleteUnitAction(unit));
    }
    
    
    
    return (
        <Card loading={props.units.loading} bordered hoverable title="Manage Units" style={{marginTop: 20}}>  
        <div className="bg-gray">
        <List>
        {props.units.data.map((unit, u) => <List.Item extra={[<Button size="small" onClick={()=>handleDelete(unit)}>x</Button>]} key={u}>{unit.name} </List.Item>)  
    }
    </List>
    <Input placeholder="Enter new unit here" onPressEnter={handleOnPressEnter} onChange={onChange}/>
    </div>
    </Card>
    )
}

export default Units 
