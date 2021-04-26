import React, { useEffect, useState } from 'react'
import {
    Card
} from 'antd'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser';
import { callApi } from '../utils/callApi'

import UnFindPage from './UnFindPage'

export default function NewsDetails() {
    const params = useParams();
    const { id } = params;
    const [data, setData] = useState();
    useEffect(() => {
        async function getNewsByIdAPI() {
            try {
                const res = await callApi(`news/${id}`, 'GET');
                if (res && res.status === 1 && res.data.status === 1) {
                    setData(res.data);
                }
            } catch (err) {
                console.log('api err, news-detail', err);
            }
        }
        getNewsByIdAPI();
    }, [id])
    return (
        <div>
            {
                !data ? <UnFindPage />
                    :
                    <Card title={data.title} bodyStyle={{fontSize: '1em'}}>
                        {parse(data.description)}
                        {data.source && 
                            <p style={{fontStyle: 'italic'}}>
                                ({data.source})
                            </p>
                        }
                    </Card>
            }
        </div>
    )
}
