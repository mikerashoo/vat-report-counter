import React, { useEffect } from 'react'
import { PageHeader,Card, Row, Col, Tabs, DatePicker, Divider } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailySellsAction, fetchDailyTransactionsAction } from "../actions/dailyActions";  
import { RightCircleOutlined } from "@ant-design/icons";  
import {ItemSells, SellsReport} from '../views/reports';
import moment from 'moment';
const TODAY = moment().format('YY-MM-DD');
const {TabPane} = Tabs;
function Daily() {
    let total_sell = 0;
    let total_loan = 0;
    
    const dispatch = useDispatch();
    const dailySell = useSelector(state => state.dailySell);
    
    dailySell.data.sells.forEach(sell => {
        total_sell += sell.total;
        total_loan += sell.loan ? sell.loan.price : 0;
    });

    useEffect(() => {
        dispatch(fetchDailyTransactionsAction(TODAY));
        dispatch(fetchDailySellsAction(TODAY));
    }, [dispatch]);

    const onSpecificDateTimeChange = (date, date_string) => {
        if(date_string.length == 0){
            date_string = TODAY;
        }
        dispatch(fetchDailyTransactionsAction(date_string));
        dispatch(fetchDailySellsAction(date_string));
    } 

    const isDateFuture = (date, date_string) => {
        console.log(date);
        console.log(date_string);
    }
    return (
        <div style={{width: '100%', height: '100%'}}>
        
        <PageHeader title="የሽያጭ ረፖርት" style={{marginBottom: 20}} onBack={() => window.history.back()} extra={[
            <DatePicker key="1" onChange={onSpecificDateTimeChange} disabledDate={isDateFuture}/>,
            <DatePicker.RangePicker key="2" showTime />
        ]}/>
        <Divider />
        <Row gutter={[12, 12]}>
        <Col span={16}>  
        <Tabs defaultActiveKey="1" tabPosition="left">
        <TabPane tab="የሽያጭ ዝርዝር" tabKey="sell" key="1">
        <SellsReport />
        </TabPane> 
        <TabPane tab="በዕቃ አይነት" tabKey="items" key="2"> 
        <ItemSells />
        </TabPane> 
        </Tabs>                    
        </Col>

        <Col span={6} offset={1}>
        <Card title="አጠቃላይ ረፖርት" bodyStyle={{backgroundColor: 'darkslateblue'}}>        
        <h6 className="text-white">ጠቅላላ ሽያጭ ገብ : {total_sell} ብር</h6>        
        <h6 className="text-white">ጠቅላላ ብድር : {total_loan} ብር</h6>      
        <h5 className="text-white"><b><RightCircleOutlined /> ጠቅላላ ቀር : {total_sell - total_loan} ብር</b></h5>   
        </Card>
        </Col>

        </Row>
        </div>
        )
    }
    
    export default Daily
    