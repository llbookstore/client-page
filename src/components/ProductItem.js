import React from 'react'
import { Card } from 'antd'
export default function ProductItem(props) {
    const {cover, title, price} = props;
    const Description = (
        <>
            <h2>{price}</h2>
        </>
    )
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt={title}
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
        >
            <Meta
                title={title}
                description="This is the description"
            />
        </Card>
    )
}
