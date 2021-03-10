import React from 'react'
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import { Card, Tag, Tooltip } from 'antd'
import { API_HOST } from '../constants/config'
import './ProductItem.scss'
const { Meta } = Card;
const ProductItem = (props) => {
    const history = useHistory();
    const { product } = props;
    const { cover_image, name, price, book_id, sale } = product;

    const onCardClick = () => {
        history.push(`/book/${book_id}`)
    }
    const Description = (
        <>
            {
                (sale && sale.percent && sale.active===1) ?
                    <>
                        <Tag color="#f50">{sale.percent}%</Tag>
                        <NumberFormat value={price} displayType={'text'} className='card-item__sale-price' thousandSeparator={true} />
                        <NumberFormat value={price - price * (sale.percent / 100)} displayType={'text'} className='card-item__price' thousandSeparator={true} />
                    </>
                    :
                    <NumberFormat value={price} displayType={'text'} className='card-item__price' thousandSeparator={true} />
            }
        </>
    )
    const Title = (
        <Tooltip className='card-title' title={name}>
            {name}
        </Tooltip>
    )
    return (
        <Card
            onClick={onCardClick}
            className='card-item'
            bordered={false}
            hoverable={true}
            cover={
                <img
                    style={{ maxWidth: 160, margin: '0 auto' }}
                    alt={name}
                    src={`${API_HOST}/images/${cover_image}`}
                />
            }
        >
            <Meta
                title={Title}
                description={Description}
            />
        </Card>
    )
}


export default ProductItem;
