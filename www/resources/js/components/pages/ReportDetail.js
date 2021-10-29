import React, { useEffect } from 'react'
import { Card, PageHeader, Table } from 'antd';
import Column from 'rc-table/lib/sugar/Column';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchReportDetailAction } from '../actions/reportActions';
import { useDispatch, useSelector } from 'react-redux'
import { Divider } from 'rc-menu';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';

export const ReportDetail = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const reports_state = useSelector(state => state.reports_state);
    useEffect(() => {
        dispatch(fetchReportDetailAction(location.state.report_id));
    }, [location]);

    const getTotals = () => {
        let buy_count = 0;
        let buy_total = 0;
        let sell_count = 0;
        let sell_total = 0;
        let total_remaining = 0;
        reports_state.selected.items.forEach(item => {
            buy_count += item.buy_count;
            buy_total += item.buy_amount;
            sell_count += item.sell_count;
            sell_total += item.sell_amount;
            total_remaining += parseInt(item.remaining);
        });

        return {
            buy_count,
            buy_total,
            sell_count,
            sell_total,
            total_remaining
        }
    }
    const _selected = reports_state.selected;
    console.log(_selected);
    return (
        <div className="container">

        <Card>
            <PageHeader
                className="site-page-header"
                onBack={() => history.goBack()}
                title={_selected ? "From " + _selected.starting_date + " to " + _selected.end_date  : "Reports"}
                subTitle={_selected ? "Total purchase : " + _selected.total_buy + " birr.  total sell " + _selected.total_sell + " birr" : ''}
            />
            <Divider  />
            {
                _selected &&
                <Table dataSource={_selected.items} rowKey="id"
                summary={pageData => {
                    return <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell>#</Table.Summary.Cell>
                            <Table.Summary.Cell>Total</Table.Summary.Cell>
                            <Table.Summary.Cell>{getTotals().buy_count}</Table.Summary.Cell>
                            <Table.Summary.Cell>{getTotals().buy_count == 0 ? 0 : parseFloat(getTotals().buy_total/getTotals().buy_count).toFixed(2)}</Table.Summary.Cell>
                            <Table.Summary.Cell>{parseFloat(getTotals().buy_total).toFixed(2)}</Table.Summary.Cell>
                            <Table.Summary.Cell>{getTotals().sell_count}</Table.Summary.Cell>
                            <Table.Summary.Cell>{getTotals().sell_count == 0 ? 0 : parseFloat(getTotals().sell_total/getTotals().sell_count).toFixed(2)}</Table.Summary.Cell>
                            <Table.Summary.Cell>{parseFloat(getTotals().sell_total).toFixed(2)}</Table.Summary.Cell>
                            <Table.Summary.Cell>{getTotals().total_remaining}</Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                }}
                >
                        <Column title="#" render={(id, item, key) => <>{key + 1} </>} key="id" />
                            <Column title="Item" key="starting_date" render={(item)=> <>{item.name}</>} />
                            {/* <Column title="actions" render={(item) => <><Button type="link" onClick={() =>showDetail(item.id)}><UnorderedListOutlined /></Button> <Button type="link" danger><DeleteOutlined  /></Button></>} /> */}
                            <ColumnGroup title="Purchased">
                    <Column title="Quantity" sorter={(a, b) => a.buy_count - b.buy_count} dataIndex="buy_count" render={(buy_count, item) => <>{buy_count == 0 ? "-" : buy_count}</>} />
                    <Column title="Per price" render={(item) => <>{item.buy_count == 0 ? "-" : parseFloat(item.buy_amount/item.buy_count).toFixed(2)}</>}/>
                    <Column title="Total price" dataIndex="buy_amount"  render={(total, item) => <>{total == 0 ? "-" : parseFloat(total).toFixed(2)}</>} />
                </ColumnGroup>
                <ColumnGroup title="Sell">
                    <Column title="Quantity" sorter={(a, b) => a.sell_count - b.sell_count} dataIndex="sell_count" render={(sell_count, item) => <>{sell_count == 0 ? "-" : sell_count}</>} />
                    <Column title="Per price" render={(item) => <>{item.sell_count == 0 ? "-" : parseFloat(item.sell_amount / item.sell_count).toFixed(2)}</>} />
                    <Column title="Total price" dataIndex="sell_amount" render={(total, item) => <>{total == 0 ? "-" : parseFloat(total).toFixed(2)}</>} />
                </ColumnGroup>
                </Table>
            }
        </Card>
    </div>
    )
}
