import React from 'react'
import { useHistory } from 'react-router-dom'
import { Result, Button } from 'antd'
export default function SuccessPayment() {
    const history = useHistory();
    return (
        <Result
            status="success"
            title="Đặt hàng thành công"
            subTitle="Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi."
            extra={[
                <Button type="primary" size='large' key="console" onClick={() => history.push('/')}>
                    Về trang chủ
                </Button>
            ]}
        />
    )
}
