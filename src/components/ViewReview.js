import React from 'react'
import { connect } from 'react-redux'
import {
    Modal,
    Rate,
    Card,
    Avatar
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getImageURL } from '../utils/callApi'
import { timestampToDate } from '../utils/common'
function ViewReview({ user, showViewReview, setShowViewReview, title, data }) {
    const { avatar } = user;
    const { full_name, rating, comment, created_at } = data;
    const handleCloseModal = () => {
        setShowViewReview(false);
    }
    return (
        <div>
            <Modal
                visible={showViewReview}
                footer={null}
                onCancel={handleCloseModal}
                title='Xem đánh giá'
                width='60%'
            >
                <Card
                    title={title}
                >
                    <Card.Meta
                        avatar={<Avatar
                            size="large"
                            icon={<UserOutlined />}
                            src={getImageURL(avatar)}
                        />}
                        title={full_name}
                        description={<>
                            <Rate value={rating} size='small' disabled style={{ fontSize: '1em' }} />
                            <br />
                            <b>{comment}</b>
                            <br />
                            {timestampToDate(created_at, 'DD/MM/YYYY, HH:mm')}
                        </>}
                    />
                </Card>
            </Modal>
        </div >
    )
}

const mapStateToProps = ({ user }) => {
    return { user };
}
export default connect(mapStateToProps)(ViewReview);