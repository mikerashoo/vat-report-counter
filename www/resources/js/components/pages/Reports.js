import React, { useEffect } from 'react'
import { Button, Card, Col, PageHeader, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReportsAction } from '../actions/reportActions';
import Column from 'rc-table/lib/sugar/Column';
import {useHistory} from 'react-router-dom'
import moment from 'moment';
import { DeleteOutlined, UnorderedListOutlined} from '@ant-design/icons'
function Reports() {

    const dispatch = useDispatch();
    const reports_state = useSelector(state => state.reports_state);
    useEffect(() => {
        dispatch(fetchReportsAction());
    }, [dispatch]);

    let history = useHistory();


    const showDetail = (id) => {
        history.push({
            pathname: '/report_detail',
            state: { report_id: id }
        });
    }
    console.log(reports_state);
    return (
        <div className="container">

            <Card>
                <PageHeader
                    className="site-page-header"
                    onBack={() => history.goBack()}
                    title="Reports"
                    subTitle="Recent reports"
                />
               <Table dataSource={reports_state.data} loading={reports_state.loading} rowKey="id" >
                            <Column title="#" render={(id, item, key) => <>{key + 1} </>} key="id" />
                            <Column title="Starting date" dataIndex="starting_date" key="starting_date" render={(starting_date, report)=> <>{moment(starting_date).format("MMMM Do YYYY")}</>} />
                            <Column title="End date" dataIndex="end_date" key="end_date" render={(end_date, report)=> <>{moment(end_date).format("MMMM Do YYYY")}</>} />
                            <Column title="Number of items reported" dataIndex="item_count" align="center" render={(item_count, items) => <span className="text-center">{parseInt(item_count)}</span>} />
                            <Column title="Total sell" align="center" sorter={(a, b) => a.total_sell - b.total_sell} dataIndex="total_sell" />
                            <Column title="Total purchased" align="center" sorter={(a, b) => a.total_buy - b.total_buy} dataIndex="total_buy" />
                            <Column title="actions" render={(item) => <><Button type="link" onClick={() =>showDetail(item.id)}><UnorderedListOutlined /></Button> <Button type="link" danger><DeleteOutlined  /></Button></>} />
                        </Table>
            </Card>
        </div>
    )
}

export default Reports
