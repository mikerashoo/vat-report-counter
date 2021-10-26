import React, { useEffect, useState } from 'react'
import { Card, DatePicker, Input, Table, Space, Button, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsAction, fetchItemsFromLastReportAction, getStartingDateAction } from '../actions/itemActions';
import moment from 'moment'
import Column from 'rc-table/lib/sugar/Column';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';
import {SearchOutlined, RightOutlined, CheckOutlined, CheckCircleOutlined} from '@ant-design/icons'
const {RangePicker} = DatePicker;
function ItemList() {
    const _items = useSelector(state => state.items);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!_items.starting_date){
            dispatch(fetchItemsFromLastReportAction());
            dispatch(getStartingDateAction());
        }

    }, [dispatch]);

    const [searchedText, setSearchedText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');


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

    return (
        <Card title={<Row>
                <Col span={8}>
                <b>የእቃዎች ዝርዝር </b>
                </Col>
                <Col span={16}>
                <div>
                    <DatePicker />
                    <span className="mx-4">
                    <RangePicker />
                    </span>
                </div>
                </Col>
            </Row>} hoverable headStyle={{backgroundColor: "#1890ff", border: 0 }}>
            {/* <div>
                <p><b>Filter area</b></p>

            </div> */}


            {_items.starting_date && <div className="text-right text-success my-2"> <b><CheckCircleOutlined /> Last report {moment(_items.starting_date).fromNow()}</b></div> }
        <Table
            loading={_items.items.loading}
            dataSource={_items.items.data}
            bordered
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            rowKey="id">
                <Column title="#" key="id" render={(id, item, index) => <>{index + 1}</>} />
                <Column title="እቃ" dataIndex="name" {...getColumnSearchProps('name')} onFilter={(value, record) => record.name.indexOf(value) === 0} render={ (name, item) => <>{item.name} <i><small>{item.code }</small> </i></>} />
                <ColumnGroup title="የተገዛ">
                    <Column title="ብዛት" sorter={(a, b) => a.buy_count - b.buy_count} dataIndex="buy_count" render={(buy_count, item) => <>{buy_count == 0 ? "-" : buy_count}</>} />
                    <Column title="የአንዱ ዋጋ" dataIndex="buy_average_price" render={(buy_average_price, item) => <>{buy_average_price == 0 ? "-" : buy_average_price}</>}/>
                    <Column title="አጠቃላይ ዋጋ" render={(item) => <>{item.buy_count * item.buy_average_price == 0 ? "-" : item.buy_count * item.buy_average_price}</>} />
                </ColumnGroup>
                <ColumnGroup title="የተሸጠ">
                    <Column title="ብዛት" sorter={(a, b) => a.buy_count - b.buy_count} dataIndex="sell_count" render={(sell_count, item) => <>{sell_count == 0 ? "-" : sell_count}</>} />
                    <Column title="የአንዱ ዋጋ" dataIndex="sell_average_price" render={(sell_average_price, item) => <>{sell_average_price == 0 ? "-" : sell_average_price}</>} />
                    <Column title="አጠቃላይ ዋጋ" render={(item) => <>{item.sell_count * item.sell_average_price == 0 ? "-" : item.sell_count * item.sell_average_price}</>} />
                </ColumnGroup>
                <Column title='ቀር' dataIndex='remaining' sorter={(a, b) => a.remaining - b.remaining} render={(remaining, item) => <>{parseInt(remaining)}</>} />
            </Table>
        </Card>
    )
}

export default ItemList
