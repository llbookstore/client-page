import React from 'react'
import Advisory from './Advisory'
import { Link } from 'react-router-dom'
import {
    Row, Col, Typography, Card, Space
} from 'antd'
//
import amazon from '../assets/img/amazon.jpg'
import lazada from '../assets/img/lazada.jpg'
import shopee from '../assets/img/shopee.jpg'
//
import dhl from '../assets/img/dhl.jpg'
import vnPost from '../assets/img/vn-post.jpg'
//
import visa from '../assets/img/visa.jpg'
import master_card from '../assets/img/master_card.jpg'
import jcb from '../assets/img/jcb.jpg'
import atm from '../assets/img/atm.jpg'
import cod from '../assets/img/cod.jpg'
import payoo from '../assets/img/payoo.jpg'
//
import { PushpinFilled, PhoneFilled, MailFilled } from '@ant-design/icons'
const { Title } = Typography;
export default function Footer() {
    return (
        <Card>
            <Advisory />
            <Row justify='space-around'>
                <Col>
                    <Card bordered={false}>
                        <Title level={5}>
                            THÔNG TIN WEBSITE
                        </Title>
                        <p>
                            <Link to='/'>Giới thiệu sách trí trệ</Link>
                        </p>
                        <p>
                            <Link to='/'>Chính sách bảo mật</Link>
                        </p>
                        <p>
                            <Link to='/'>Điều khoản sử dụng</Link>
                        </p>
                    </Card>
                </Col>
                <Col>
                    <Card bordered={false}>
                        <Title level={5}>
                            TRỢ GIÚP
                        </Title>
                        <p>
                            <Link to='/'>Hướng dẫn mua hàng</Link>
                        </p>
                        <p>
                            <Link to='/'>Phương thức thanh toán</Link>
                        </p>
                        <p>
                            <Link to='/'>Phương thức vận chuyển</Link>
                        </p>
                    </Card>
                </Col>
                <Col>
                    <Card bordered={false}>
                        <Title level={5}>
                            TIN TỨC SÁCH
                        </Title>
                        <p>
                            <Link to='/news'>Trang tin tức sách</Link>
                        </p>
                    </Card>
                </Col>
                <Col>
                    <Card bordered={false} >
                        <Title level={5}>
                            CHẤP NHẬN THANH TOÁN
                        </Title>
                        <Space>
                            <img src={visa} alt='visa' />
                            <img src={master_card} alt='master_card' />
                            <img src={jcb} alt='jcb' />
                        </Space>
                        <br />
                        <br />
                        <Space>
                            <img src={atm} alt='atm' />
                            <img src={cod} alt='cod' />
                            <img src={payoo} alt='payoo' />
                        </Space>
                    </Card>
                </Col>
                <Col>
                    <Card bordered={false} >
                        <Title level={5}>
                            ĐỐI TÁC VẬN CHUYỂN
                        </Title>
                        <img src={vnPost} alt='vn-post' /><br />
                        <img src={dhl} alt='dhl' width='100%' /><br />
                    </Card>
                </Col>
                <Col>
                    <Card bordered={false}>
                        <Title level={5}>
                            ĐỐI TÁC BÁN HÀNG
                        </Title>
                        <img src={lazada} alt='lazada' /><br />
                        <img src={shopee} alt='shopee' /><br />
                        <img src={amazon} alt='amazon' /><br />
                    </Card>
                </Col>
            </Row>
            <Row justify='space-around' style={{paddingBottom: '4px'}}>
                <div style={{ display: 'flex' }}>
                    <Title level={5} style={{marginRight: '6px'}}>
                        LIÊN HỆ:
                    </Title>
                    <p>
                        <PushpinFilled /> Phường Minh Khai, Quận Bắc Từ Niêm, Hà Nội.
                    </p>

                </div>
                <div>
                    <MailFilled /> hotro@llbook.com
                </div>
                <div>
                    <PhoneFilled /> 0342153919
                </div>
            </Row>
        </Card>
    )
}
