import React from 'react'
import { Radio } from 'antd';
import { paymentTypes } from '../../constants/config'

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

export default function PaymentType(props) {
    const { type, onTypeChange } = props;

    const onChange = e => {
        console.log('radio checked', e.target.value);
        onTypeChange(e.target.value);
    };
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Radio.Group onChange={onChange} value={type} style={{ flex: '30%' }}>
                {
                    paymentTypes.map(item =>
                        <div key={item.key}>
                            <Radio value={item.key} style={radioStyle} >{item.title}</Radio>
                        </div>
                    )
                }
            </Radio.Group>
            <div style={{ flex: '70%' }}>
                {paymentTypes[type].content}
            </div>
        </div>
    )
}
