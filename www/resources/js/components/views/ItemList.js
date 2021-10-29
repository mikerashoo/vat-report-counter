import React, { useEffect, useState } from 'react'
import { Card, DatePicker, Input, Table, Space, Button, Row, Col, Popconfirm, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsFromLastReportAction, getStartingDateAction } from '../actions/itemActions';
import moment from 'moment'
import {Link, NavLink} from 'react-router-dom'
import Column from 'rc-table/lib/sugar/Column';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';
import {SearchOutlined, RightOutlined, CheckOutlined, CheckCircleOutlined} from '@ant-design/icons'
import { saveReportAction } from '../actions/reportActions';
const {RangePicker} = DatePicker;
function ItemList() {
    const items_state = useSelector(state => state.items_state);
    const reports_state = useSelector(state => state.reports_state);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!items_state.starting_date){
            dispatch(fetchItemsFromLastReportAction());
            dispatch(getStartingDateAction());
        }

    }, [dispatch]);

    const [searchedText, setSearchedText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [endDate, setendDate] = useState(null);
    const getTotals = () => {
        let buy_count = 0;
        let buy_total = 0;
        let sell_count = 0;
        let sell_total = 0;
        let total_remaining = 0;
        items_state.items.data.forEach(item => {
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

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                var searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchedText(selectedKeys[0]);
                  setSearchedText(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => {
            console.log("value searched ==", value);
            return  record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '';
        },
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.select(), 100);
          }
        },
        render: text =>
            searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchedText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchedText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };

      const handleReset = clearFilters => {
        clearFilters();
        // this.setState({ searchText: '' });
        setSearchedText('');
      };


      const saveReport = () => {
          const total = getTotals();
          const report = {
              starting_date: items_state.starting_date,
              end_date: endDate,
              total_buy: total.buy_total,
              total_sell: total.sell_total,
              item_count: items_state.items.data.length
          }
          dispatch(saveReportAction(report));
      }


    useEffect(() => {
        if(reports_state.is_save_successful){
            message.success({content: 'መረጃው በትክክል ተመዝግቧል።', key: 'save_item_message'});
            dispatch(fetchItemsFromLastReportAction());
            dispatch(getStartingDateAction());
        }
    }, [reports_state.is_save_successful]);


    return (
        <Card title={<Row>
                <Col span={6}>
                <b style={{color: 'white'}}>Items in store </b>

                </Col>
                <Col span={18}>
                <div className="text-right">
                    <DatePicker size="small" />
                    <span className="mx-4">
                    <RangePicker size="small" />
                    </span>
                    <Popconfirm
                title="Are you sure you want to save report?"
                cancelText="Cancel"
                okText="Yes save!"
                onConfirm={saveReport}>

                <Button type="primary" size="small" style={{backgroundColor: 'deeppink', borderColor:'deeppink', color: 'white'}}>Report </Button>
                </Popconfirm>
                </div>

                </Col>
            </Row>} hoverable headStyle={{backgroundColor: "#1890ff", border: 0 }}>

            {items_state.starting_date &&
            <Row>
                <Col span={6}>

                </Col>
                <Col span={18}>
                <div className="text-right text-success my-2">

                <b><CheckCircleOutlined /> Last report {moment(items_state.starting_date).utc().local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</b>



            </div>
                </Col>
            </Row>
          }
        <Table
            loading={items_state.items.loading}
            dataSource={items_state.items.data}
            bordered
            size="small"
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            rowKey="id"
            summary={pageData => {
                return <>
                    <Table.Summary.Row>
                        <Table.Summary.Cell>#</Table.Summary.Cell>
                        <Table.Summary.Cell>Tota;</Table.Summary.Cell>
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
                <Column title='Remaining' dataIndex='remaining' sorter={(a, b) => a.remaining - b.remaining} render={(remaining, item) => <>{parseInt(remaining)}</>} />

            </Table>
        </Card>
    )
}

export default ItemList
