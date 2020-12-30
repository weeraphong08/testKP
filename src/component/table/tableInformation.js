import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, Form, Space } from 'antd';
import { manageTable } from './editTable'

const component = manageTable

// const storageData = JSON.parse(localStorage.getItem('myData')) || [];
const ViewTableData = (props, state) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [selectRowKey, setSelectRowKey] = useState([]);

    useEffect(() => {
        setData(props.dataToTable)
    }, [props.dataToTable])

    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        console.log(record.key)
        form.setFieldsValue({
            name: '',
            genDer: '',
            mobilePhone: '',
            nationality: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const onSelectChange = selectRowKey => {
        console.log('selectedRowKeys changed: ', selectRowKey);
        setSelectRowKey({ selectRowKey });
    };
    const rowSelection = {
        selectRowKey,
        onChange: onSelectChange,
    };
    // const hasSelected = selectedRowKeys.length > 0;
    const columns = [
        {
            title: 'NAME',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'GENDER',
            dataIndex: 'genDer',
            width: '15%',
            editable: true,
        },
        {
            title: 'MOBILE PHONE',
            dataIndex: 'mobilePhone',
            width: '15%',
            editable: true,
        },
        {
            title: 'NATIONALITY',
            dataIndex: 'nationality',
            width: '25%',
            editable: true,
        },
        {
            // title: 'operation',
            dataIndex: 'operation',
            width: '10%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="javascript:;"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) :
                    (
                        <Space size="middle">
                            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Edit
                            </a>
                            /
                            {data.length >= 1 ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                                    <a>Delete</a>
                                </Popconfirm>
                            ) : null}
                        </Space>

                    );
            },
        },
    ];
    const handleDelete = (key) => {
        const dataSource = [...data];
        let newData = dataSource.filter(item => item.key !== key)
        setData(newData);
    };
    const handleButtonDelete = () => {
        selectRowKey.selectRowKey.forEach(element => {
            const dataSource = [...data];
            let newData = dataSource.filter(item => item.key !== element)
            setData(newData);
        });
    }
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'mobilePhone' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            {/* <Form.Item style={{ paddingLeft: "20em" }}>
                <Button onClick={handleButtonDelete} type="primary" htmlType="submit">
                    Delete
                </Button>
            </Form.Item> */}
            <Table
                style={{ paddingLeft: "150px", paddingRight: "150px" }}
                components={component}
                bordered
                rowSelection={rowSelection}
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default ViewTableData