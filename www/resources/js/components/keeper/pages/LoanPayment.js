import React, { useEffect, useState } from 'react'
import { Button, PageHeader, Popconfirm, Input, Popover, Table, message, Row, Col, DatePicker, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {fetchUnpaidLoansAction, saveLoanPaymentAction, fetchLoanPaymentsAction} from '../actions/loanActions'
import moment from 'moment' 
import { toInteger, toLower, toNumber } from 'lodash';
import { StockOutlined } from "@ant-design/icons";  

function LoanPayment() {
    
    const loanData = useSelector(state => state.loanData)
    const dispatch = useDispatch();
    
    const [pop_visibility, setPopVisibility] = useState(null);
    const [paid, setPaid] = useState(0)
    const [loans, setLoans] = useState([])
    
    useEffect(() => {
        dispatch(fetchUnpaidLoansAction())
        dispatch(fetchLoanPaymentsAction(window.user.id))

    }, [dispatch]);

    useEffect(() => {
    setLoans(loanData.data.loans);        
    }, [loanData.data.loans])
     
    let loan_payments = loanData.data.payments; 
    
    const getTotalPayment = loan => {
        let payed = 0;
        loan.payments.forEach(payment => {
            payed += payment.amount;
        });        
        return payed;
    }
    
    const onLoanPaymentChange = (evt, loan) => {
        let value = evt.target.value;
        let loan_total = loan.price - getTotalPayment(loan);
        
        if(loan_total < value){
            message.error('ክፍያው ክቀር በላይ ነው! እባከው ያስተካክሉ!');
            return;
        }
        setPaid(value);
    }
    
    const onLoanPopoverVisibility = (visible, loan) => {
        if(!visible) {
            setPaid(0);
            setPopVisibility(null); 
            return;
        }       
        setPopVisibility(loan.id);        
    };
    
    const onLoanPaymentConfirm = loan => {
        if(paid <= 0){
            message.error('እባከው ክፍያውን ያስገቡ!');
            return;
        }
        let loan_id = loan.id;
        let user_id = window.user.id;  
        let loanPayment = {
            loan_id,
            user_id,
            amount: paid
        }
        dispatch(saveLoanPaymentAction(loanPayment));
        dispatch(fetchLoanPaymentsAction(window.user.id));
        setPopVisibility(null);
        setPaid(0);
    }
    
    const loanTableColumns = [
        {
            title: '# ',
            dataIndex: 'id',
            render: (id, loan, index) => <>{toInteger(index) + 1} </>
        },  
        {
            title: 'ደንበኛ',
            dataIndex: 'id',
            render: (id, loan, index) => <p>{loan.customer.name}</p>
        },  
        {
            title: 'ሽያጭ', 
            render: (id, loan) => <Popover content={<div>
                {
                    loan.sell.transactions.map(transact => <p>{transact.item.name } : {transact.quantity} x {transact.price} = <b>{toNumber(transact.quantity) * toNumber(transact.price)} birr </b></p>)
                    
                }
            </div>}><Button><StockOutlined /></Button></Popover>
        },  
        {
            title: 'ጠቅላላ ብር',
            dataIndex: 'price',
            sorter: {
                compare: (a, b) => a.price - b.price
            },
            render: (price, loan) => <>{price } ብር
            </>
        },     
        {
            title: 'የተክፈለ', 
            sorter: {
                compare: (a, b) => getTotalPayment(a) - getTotalPayment(b)
            },
            render: (loan) => <Popover content={<div>{loan.payments.map(payment => <p><b>{payment.amount} birr </b> - {moment(payment.created_at).fromNow()}</p>) }</div>}>
            <p>{getTotalPayment(loan) } ብር</p>
            </Popover>
        },   
        {
            title: 'ቀሪ', 
            sorter: {
                compare: (a, b) => (a.price - getTotalPayment(a)) - (b.price - getTotalPayment(b))
            },
            render: (loan) => <>{loan.price - getTotalPayment(loan) } ብር
            </>
        },     
        {
            title: 'ሰዓት',
            dataIndex: 'created_at',
            sorter: {
                compare: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix()
            },      
            render: (time, sell) => <>{moment(time).fromNow()} 
            </>
        },           
        {
            render: (trans, loan) => 
            <Popover 
            title={<> <h5>{loan.customer.name + ' ብድር ክፍያ'} {toInteger(loan.price) - toInteger(getTotalPayment(loan))} ቀር ብር</h5> </>} 
            style={{width: '50%'}}  
            content={
                <>                 
                <Input type="number" addonAfter="ብር የተክፈለ" style={{margin: 5}} value={paid} onChange={(evt) => onLoanPaymentChange(evt, loan)}/>                  
                <Input value="200" disabled addonAfter="ብር ቀሪ"  style={{margin: 5}} value={toInteger(loan.price) - toInteger(getTotalPayment(loan)) - paid}/> 
                <div className="text-right">
                <Button type="dashed" size="large" onClick={() => onLoanPopoverVisibility(false, loan)}> ይቅር!</Button>
                
                <Popconfirm title="እርገጠኛ ነኝ የብድር ክፍያ ይመዝገብ" okText="አዎ መዝገብ" cancelText="አይ ተው!" onConfirm={() => onLoanPaymentConfirm(loan)}>
                <Button type="primary" style={{backgroundColor: 'blueviolet', borderColor: 'blueviolet'}} size="large"> ክፈል</Button>
                </Popconfirm>
                </div>
                </>
            }
            trigger="click"            
            onVisibleChange={(visible) => onLoanPopoverVisibility(visible, loan)}
            visible={pop_visibility == loan.id}
            >
            <Button type="primary" style={{backgroundColor: 'blueviolet', borderColor: 'blueviolet'}} size="small">ክፈል</Button>
            </Popover>
        },  
    ]
    
    const paymentsTableColumns = [ 
        {
            title: 'ደንበኛ',
            dataIndex: 'id',
            render: (id, payment, index) => <>{payment.loan.customer.name}</>
        },  
        {
            title: 'የተክፈለ ብር',
            dataIndex: 'amount',
            render: (price, loan) => <>{price } ብር
            </>
        },   
        {
            title: 'ሰዓት',
            dataIndex: 'created_at',
            render: (time, payment) => <>{moment(time).fromNow()} </>
        },    
    ]

    const onCustomerSearch = evt => {
        let value = evt.target.value;
        let _loans = loanData.data.loans.filter(loan => toLower(loan.customer.name).startsWith(toLower(value)));
        setLoans(_loans);
    }

    const onDateTimeChange = (time, timeString) => { 
        let _loans = loanData.data.loans.filter(loan => toLower(loan.created_at).startsWith(toLower(timeString)));
        setLoans(_loans);
    }
    return (
        <div>
        <PageHeader title="ብድር መክፈያ" style={{marginBottom: 20}} onBack={() => window.history.back()}/>
        <Row gutter={[16, 16]}>
        <Col span={16}>
        <Card hoverable title="ብድር ያለባቸው ደንበኞች ዝርዝር" headStyle={{backgroundColor: '#eef'}}>
        <div style={{padding: 10}}>
            <Input placeholder="በስም ፈልግ" style={{width: '30%'}} onChange={(evt) => onCustomerSearch(evt)}/>
            <DatePicker placeholder="Pick date" onChange={onDateTimeChange}/>
        </div>
        <Table dataSource={loans} loading={loanData.loading} columns={loanTableColumns} rowKey="id" showSorterTooltip />
        </Card>
        </Col>
        <Col span={8}>
        <Card hoverable title="ዛረ የተከፈሉ ብድሮች" headStyle={{backgroundColor: '#eef'}}>
        <Table dataSource={loan_payments} loading={loanData.loading} columns={paymentsTableColumns} 
        rowKey="id" 
        summary={pageData => {
            let totalAmount = 0; 
            pageData.forEach(payment => {  
                totalAmount += payment.amount;
            });
            return (
                <>
                <Table.Summary.Row style={{backgroundColor: 'gold'}}> 
                <Table.Summary.Cell>ጠቅላላ</Table.Summary.Cell> 
                <Table.Summary.Cell>{totalAmount} ብር</Table.Summary.Cell> 
                <Table.Summary.Cell>-</Table.Summary.Cell>
                </Table.Summary.Row> 
                </>
                )
            }}
         />
        </Card>
        </Col>
        </Row>
        </div>
        )
    }
    
    export default LoanPayment;
    