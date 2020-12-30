import React, { useEffect, useState } from 'react';
import { Form, Col, Row, DatePicker, Input, Button, Select, Radio } from 'antd';
import moment from 'moment';
import './Information.css'

const { Option } = Select;
const titles = [
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Mrs.', value: 'Mrs.' }
];
const nationalitys = [
    { label: 'THAI', value: 'THAI' },
    { label: 'AMERICAN', value: 'AMERICAN' },
    { label: 'LAOS', value: 'LAOS' }
];
const FormInformation = (props, state) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState([])
    const [countKey, setCountKey] = useState(0)

    const onFinish = values => {
        // console.log('Received values of form:', values);
        let itemData = {
            key: countKey,
            title: values.title,
            name: values.firstName + '   ' + values.lastName,
            birthDay: moment(values.birthDay).format(),
            nationality: values.nationality,
            citizenID: values.citizenID.citizenID1 + '-' + values.citizenID.citizenID2 + '-' + values.citizenID.citizenID3 + '-' + values.citizenID.citizenID4 + '-' + values.citizenID.citizenID5,
            genDer: values.genders,
            mobilePhone: values.prefix + values.phone,
            passportNo: values.passport,
            expectedSalary: values.salary
        }
        // console.log('Received values of form:', itemData);
        setFormData(formData => [...formData, itemData])
        setCountKey(countKey + 1)
    };
    useEffect(() => {
        if (formData.length > 0) {
            localStorage.setItem('myData', JSON.stringify(formData));
            props.onDataResult(formData)
        }
    })
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 60,
                }}
            >
                <Option value="+99" >
                    <span>
                        <img
                            alt="Thailand"
                            src="http://purecatamphetamine.github.io/country-flag-icons/3x2/TH.svg" />

                    </span>
                </Option>
            </Select>
        </Form.Item>
    )
    return (
        <div >
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Row gutter={8}>
                    <Col className="gutter-row" span={2} offset={4}>
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Missing title' }]}>
                            <Select options={titles} style={{ width: 70 }} />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Form.Item
                            name="firstName"
                            label="Firstname:"
                            rules={[{ required: true, message: 'Firstname is required' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Form.Item
                            label="Lastname"
                            name="lastName"
                            rules={[{ required: true, message: 'Lastname is required' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={3} offset={4}>
                        <Form.Item name="birthDay" label="Birthday" rules={[{ required: true, message: 'Missing Date' }]}>
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4} >
                        <Form.Item
                            name="nationality"
                            label="Nationality"
                        >
                            <Select placeholder=" -- Please Select --" style={{ width: 152 }} options={nationalitys} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={20} offset={4}>
                        <Form.Item label="CitizenID">
                            <Input.Group compact>
                                <Form.Item
                                    name={['citizenID', 'citizenID1']}
                                    noStyle
                                >
                                    <Input type="text" pattern="[0-9]*" maxLength={2} style={{ width: '3.5%' }} />
                                </Form.Item>
                                <span
                                    style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                >
                                    -
                                </span>
                                <Form.Item
                                    name={['citizenID', 'citizenID2']}
                                    noStyle
                                >
                                    <Input type="text" maxLength={3} style={{ width: '4%' }} />
                                </Form.Item>
                                <span
                                    style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                >
                                    -
                                </span>
                                <Form.Item
                                    name={['citizenID', 'citizenID3']}
                                    noStyle
                                >
                                    <Input type="text" maxLength={3} style={{ width: '4%' }} />
                                </Form.Item>
                                <span
                                    style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                >
                                    -
                                </span>
                                <Form.Item
                                    name={['citizenID', 'citizenID4']}
                                    noStyle
                                >
                                    <Input type="text" maxLength={3} style={{ width: '4%' }} />
                                </Form.Item>
                                <span
                                    style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                >
                                    -
                                </span>
                                <Form.Item
                                    name={['citizenID', 'citizenID5']}
                                    noStyle
                                >
                                    <Input type="text" maxLength={2} style={{ width: '3.5%' }} />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={20} offset={4}>
                        <Form.Item name="genders" label="Gender">
                            <Radio.Group>
                                <Radio value="male">male</Radio>
                                <Radio value="female">female</Radio>
                                <Radio value="unisex">unisex</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={5} offset={4}>
                        <Form.Item
                            name="phone"
                            label="Mobile Phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your mobile phone!',
                                },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                maxLength={9}
                                type="text"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={5} offset={4}>
                        <Form.Item
                            name="passport"
                            label="Passport NO"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={5} offset={4}>
                        <Form.Item
                            name="salary"
                            label="Expected Salary"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your expected salary',
                                },
                            ]}
                        >
                            <Input type="text" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={1} >
                        <span style={{ fontSize: 20 }}>THB</span>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={2} offset={13}>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>

    )
}
export default FormInformation