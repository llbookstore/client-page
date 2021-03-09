import React from 'react'
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';

const ProductDetail = (props) => {
    const { products } = props;
    const { id } = useParams();
    const history = useHistory()
    const productData = products.find(item => item.book_id == id);
    
    return (
        !productData ?
            <Result
                status="404"
                title="404"
                subTitle="Rất tiếc, trang web này không tồn tại!"
                extra={<Button type="primary" onClick={() => history.push('/')}>Trở về trang chủ</Button>}
            />
            :
            <div>
                hihi
        </div>

    )
}
const mapStateToProps = (state) => {
    const { products } = state;
    return { products }
}
export default connect(mapStateToProps)(ProductDetail);