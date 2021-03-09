import React from 'react';
import Category from './Category';
import ProductItem from './ProductItem'

const fakeItem =  {
    book_id: 8,
    author_id: 7,
    name: 'Cường Quốc Trong Tương Lai',
    cover_image: 'cover_image-1614939980015.jpg',
    description: 'Kinh tế thế giới đến năm 2030 sẽ có những phát triển như thế nào?\nThế giới sẽ thay đổi ra sao?\nVị thế của Mỹ, Trung Quốc trong thời đại mới?\nChiến tranh thương mại Mỹ - Trung liệu còn tiếp diễn?\nĐiều kiện để trở thành một trong các cường quốc trong tương lai?\nTrong cuốn sách, tác giả Hamada Kazuyuki dành hẳn một phần để luận bàn về kinh tế Việt Nam. Việt Nam được đánh giá là quốc gia có nền kinh tế phát triển nổi bật nhất ở châu Á. Với dân số trẻ, tầng lớp thượng lưu ngày càng đông, thị trường quốc nội phát triển nhanh chóng, thêm vào đó là tinh thần vượt lên nghịch cảnh, biến đau thương thành sức mạnh, cùng một chiến lược ngoại giao khôn khéo..., Việt Nam có đủ tham vọng, tầm nhìn và năng lực chuyển mình thành cường quốc trong tương lai, thách thức các cường quốc hiện tại.',
    language: 'Tiếng Việt',
    pages: 280,
    dimension: '14 x 20.5 cm',
    weight: 330,
    published_date: 1577811600,
    publisher: 'Nxb Thế giới',
    format: 'Bìa mềm',
    book_translator: 'Võ Vương Ngọc Chân',
    quantity: 50,
    price: 109000,
    had_bought: null,
    sale_id: 11,
    status: null,
    updated_at: 1614940706,
    updated_by: 'admin1',
    created_at: 1614939981,
    created_by: 'admin1',
    active: 1,
    publishing_id: 2,
    author: {
      author_id: 7,
      name: 'Hamada Kazuyuki',
      avatar: null,
      description: null,
      created_at: 1614939129,
      created_by: 'admin1',
      updated_at: null,
      updated_by: null
    },
    sale: {
      sale_id: 11,
      active: 1,
      percent: 10,
      date_start: 1614939782,
      date_end: 1625480580,
      created_at: 1614939860,
      created_by: 'admin1',
      updated_at: null,
      updated_by: null
    },
    publishing: {
      publishing_id: 2,
      name: 'Alpha books',
      image: 'image-1614913980448.jpg',
      description: 'Alpha Books là một trong những thương hiệu hàng đầu tại Việt Nam về mảng sách quản trị kinh doanh và giáo dục, tư duy với nhiều dòng sách mới hấp dẫn, từng bước trở thành người bạn thân thiết của hàng triệu độc giả Việt Nam.',
      created_at: 1614913981,
      created_by: 'admin1',
      updated_at: null,
      updated_by: null,
      active: 1
    },
    category_details: [
      {
        category_id: 10
      }
    ]
}
export default function Home() {
    return (
        <>
            <Category />
            <ProductItem products={fakeItem}/>
        </>
    )
}
