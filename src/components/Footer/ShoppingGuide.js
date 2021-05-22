import React, { useEffect } from 'react'
import { Card, Steps } from 'antd'
import stepone1 from '../../assets/img/stepone1.png'
// import stepone2 from '../../assets/img/stepone2.png'
import stepone3 from '../../assets/img/steoone3.png'
// import cart from '../../assets/img/cart.png'
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
            <img src={stepone3} alt='buoc 1' height={300} />
            <br />
            Sau khi xem xong các thông tin của sách, khách hàng nhấn chọn số lượng sản phẩm và chọn thêm vào giỏ hàng
            <br />
            Để có thể thêm giỏ hàng khách hàng cần phải đăng nhập vào hệ thống.
            <img src={stepone1} alt='buoc 1' height={300} />
            <br />
            Ngoài ra khách hàng nhấn vào nút "MUA NGAY" để mua sách
        </div>
    }
    const StepTwo = () => {
        return <div style={{ color: 'black' }}>
            Khách hàng nhấn vào mục giỏ hàng sẽ hiện ra danh sách sản phẩm trong giỏ hàng.
            <img src={headerCart} alt='buoc 1' height='auto' width='90%' />
            <br />
            Tại trang giỏ hàng, khách hàng có thể thêm, bớt hoặc bỏ sp ra khỏi giỏ hàng trước khi thanh toán.
            <img src={cart1} alt='buoc 1' height={300} />
            <br />
            Khách hàng nhấn nút "Thanh Toán" để thực hiện bước kế tiếp.
            <br />
        </div>
    }
    const StepThree = () => {
        return <div style={{ color: 'black' }}>
            Khách hàng kiểm tra những thông tin thanh toán và bấm nút "Lưu"
            <img src={address1} width='100%' height='auto' alt='buoc 3'/>
            <br />
            <p>Sau khi hoàn thành thông tin thanh toán khách hàng chọn nút "Tiếp tục"</p>
            <img src={address2} width='100%' alt='buoc 1' />
            <br />
            <br />
        </div>
    }
    const StepFour = () => {
        return <div style={{ color: 'black' }}>
            Khách hàng chọn hình thức thanh toán và chọn nút "Tiếp tục"
            <img src={chooseMethod} width='100%' alt='buoc 4'/>
        </div>
    }
    const StepFive = () => {
        return <div style={{ color: 'black' }}>
            Khách hàng xem lại thông tin và chọn "Xác nhận mua hàng"
            <img src={done} width='100%' alt='buoc 4'/>
            <br />
            Sau khi hoàn thành, nhà sách sẽ liên hệ với bạn để xác nhận đơn hàng và tiến hành chuyển hàng
            <br />
            <img src={success} alt='buoc 4'/>

        </div>
    }
    return (
        <Card>
            <Steps progressDot current={5} direction="vertical">
                <Step title={<h3>1. Chọn sản phẩm cần mua</h3>} description={<StepOne />} />
                <Step title={<h3>2. Kiểm tra giỏ hàng</h3>} description={<StepTwo />} />
                <Step title={<h3>3. Kiểm tra thông tin thanh toán</h3>} description={<StepThree />} />
                <Step title={<h3>4. Chọn phương thức thanh toán</h3>} description={<StepFour />} />
                <Step title={<h3>5. Xác nhận và đặt hàng</h3>} description={<StepFive />} />
            </Steps>
        </Card>
    )
}
