import React, { useEffect } from 'react'
import { Card, Steps } from 'antd'
import stepone1 from '../../assets/img/stepone1.png'
import stepone2 from '../../assets/img/stepone2.png'
import cart from '../../assets/img/cart.png'
import cart1 from '../../assets/img/cart1.png'
import headerCart from '../../assets/img/headerCart.png'
import address1 from '../../assets/img/address1.png'
import address2 from '../../assets/img/address2.png'
import chooseMethod from '../../assets/img/chooseMethod.png'
import done from '../../assets/img/done.png'
import success from '../../assets/img/success.PNG'
const { Step } = Steps;
export default function ShoppingGuide() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const StepOne = () => {
        return <div style={{ color: 'black' }}>
            Khách hàng lựa chọn xem sản phẩm cần mua, hệ thống sách trí tuệ cung cấp cho khách hàng các thông tin chi tiết nhất liên quan đến cuốn sách khách hàng quan tâm để có sự lựa chọn tốt nhất. Ngoài ra hệ thống "sách Trí Tuệ" còn cho phép khách hàng xem trước trích đoạn của sách.
            <img src={stepone1} alt='buoc 1' height={300} />
            <br />
            Sau khi xem xong các thông tin của sách, khách hàng nhấn vào nút "MUA NGAY" để mua sách
        </div>
    }
    return (
        <Card>
            <Steps progressDot current={5} direction="vertical">
                <Step title={<h3>1. Chọn sản phẩm cần mua</h3>} description={<StepOne />} />
                <Step title="Finished" description="This is a description. This is a description." />
                <Step title="In Progress" description="This is a description. This is a description." />
                <Step title="Waiting" description="This is a description." />
                <Step title="Waiting" description="This is a description." />
            </Steps>
        </Card>
    )
}
