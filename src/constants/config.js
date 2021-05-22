import { Space } from 'antd'
import bank_4 from '../assets/img/bank_4.png'
import bank_1 from '../assets/img/bank_1.png'
import bank_19 from '../assets/img/bank_19.png'
import bank_24 from '../assets/img/bank_24.png'
import visa from '../assets/img/icon_visa_master.jpg'
export const API_HOST = 'https://llbook-api.herokuapp.com/'
export const MAX_CART = 10
export const RPP = 10
export const paymentTypes = [
    {
        key: 0,
        title: 'Thanh toán bằng tiền mặt khi nhận hàng',
        content: <p>
            Nhân viên Giao hàng của Vinabook hoặc Bưu điện sẽ thu tiền mặt khi giao hàng cho Quý khách. <br />
            Trong trường hợp Quý khách nhờ người nhận giúp, vui lòng thông báo số tiền thanh toán cho người nhà.
            <br />
            <strong>Miễn phí dịch vụ này đối với đơn hàng giao tại Hồ Chí Minh</strong></p>
    },
    {
        key: 1,
        title: 'Thẻ ATM có Internet Banking',
        content: <>
            <p>
                Thanh toán bằng thẻ ATM do các ngân hàng sau phát hành và
            <b><span style={{ color: '#c0504d' }}>
                    được ưu tiên xử lý đơn hàng trước</span>
                </b>
        (<b>miễn phí phí thanh toán qua thẻ</b>)
        <br />
                <span style={{ fontSize: '18px' }}>
                    <i>Lưu ý:</i> thẻ ATM hoặc tài khoản của bạn phải
            <b><span style={{ color: '#c0504d' }}>
                        đăng ký dịch vụ Internet Banking với ngân hàng <br />
                    </span>
                    </b>
                mới sử dụng được hình thức thanh toán này
                </span>
            </p>
            <Space size='small' style={{ display: 'flex', flexWrap: 'wrap' }}>
                <img src={bank_1} alt='bank' width='70%' />
                <img src={bank_4} alt='bank' width='70%' />
                <img src={bank_19} alt='bank' width='70%' />
                <img src={bank_24} alt='bank' width='70%' />
            </Space>
            <br />
            <p><u><i>Lưu ý</i>:</u> Thẻ ATM của quý khách cần được đăng ký dịch vụ Online Banking/Internet Banking/Thanh toán trực tuyến tại ngân hàng mới có thể sử dụng được dịch vụ. Liên hệ với ngân hàng mở thẻ để được hướng dẫn hoặc gọi vào Hotline của llbook.com <b>19006401</b>.</p>
            <p>Trong trường hợp đã ngân hàng đã trừ tiền vào tài khoản nhưng giao dịch vẫn chưa thành công, vui lòng liên hệ <b>hotro@llbook.com</b> hoặc Hotline <b>1900 6401 </b>để được hỗ trợ.<br /></p>
        </>
    },
    {
        key: 2,
        title: 'Thẻ Visa/Master Card',
        content: <>
            <p>Thanh toán bằng thẻ tín dụng Visa hoặc MasterCard và <b><span style={{ color: '#c0504d' }}>được ưu tiên xử lý đơn hàng trước</span></b>.
            <br />
            Hệ thống thanh toán qua cổng <b>OnePay </b>hỗ trợ tính năng bảo mật Verified By Visa và MasterCard SecureCode</p>
            <img src={visa} alt='visa' />
        </>
    },
]

export const ORDER_STATUS = [
    {
        status: -1,
        name: 'Đã hủy'
    },
    {
        status: 0,
        name: 'Đang chờ xử lý'
    },
    {
        status: 1,
        name: 'Đã xác nhận đơn hàng'
    },
    {
        status: 2,
        name: 'Đang chuyển hàng'
    },
    {
        status: 3,
        name: 'Giao hàng thành công'
    },

]