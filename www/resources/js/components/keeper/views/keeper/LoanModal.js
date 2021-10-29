import React, { useEffect, useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Card, Col,Input, InputNumber, List, Row, Button, Form, message } from 'antd' 
import { addNewLoanAction, fetchCustomersAction } from '../../actions/stockActions';
import { useDispatch, useSelector } from 'react-redux'; 
import { toInteger } from 'lodash';
function LoanModal(props) {
    const dispatch = useDispatch();
    const stocks = useSelector(state => state.stocks);
    const [user, setUser] = useState(null);
    const [paid, setPaid] = useState(0);
    const saveLoan = loan => {
        if(0 <= loan.paid && loan.paid < props.total){
            dispatch(addNewLoanAction(loan));
            return;
        }
        message.error('የተከፈለው ህሳብ ስተት አለበት! እንደገና ይሞክሩ!');
        
    }
    
    useEffect(() => {
        dispatch(fetchCustomersAction());
    }, [dispatch]);
    
    const selectCustomer = user => {
        setUser(user);
    };
    
    return (
        <Row gutter={[16, 16]}>
        <Col span={14}>
        <List size="small" >
        <List.Item>
        <Input.Search placeholder="ደንበኛውን ፈልግ" style={{width: '100%'}}/>
        </List.Item>
        {
            stocks.data.customers.map((user, u) => <List.Item key={u} onClick={() => selectCustomer(user)} style={{cursor: 'pointer'}}>{user.name}</List.Item>)
        }
        </List>
        </Col>
        <Col span={10}>
        {
            user && <Card title={user.name} extra={[<CloseCircleFilled key="close"/>]}>     
            
            <p style={{margin: 0}}>አጠቃላይ ህሳብ : <b>{props.total} ብር</b></p> 
            <Form>
            
            <Form.Item label="አጠቃላይ የምክፈል" rules={
                [
                    { max: toInteger(props.total)},
                    { min: 0},
                    
                ]
            }> 
            <InputNumber value={paid} 
            onChange={(value) => setPaid(value)} 
            />
            </Form.Item>
            <p style={{margin: 0}}>ቀር : <b>{props.total - paid} ብር</b></p> 
            <Button type="primary" onClick={()=>saveLoan({
                user,
                paid
            })}>ብድር መዝግብ</Button>
            
            </Form>
            </Card>}
            </Col> 
            </Row>  
            )
        }
        
        export default LoanModal
        