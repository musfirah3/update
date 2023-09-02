import React, { useState } from 'react'
import { useEffect } from 'react'
import { Badge, Button, Card, Image, List, Rate, Spin, Typography } from 'antd'
import { Link, useParams } from 'react-router-dom'
// import { AppRoute } from '../../../App';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import axios from 'axios'



function Products() {
  const [loading, setLoading] = useState(false)
  const { category } = useParams()
  const [items, setItems] = useState([])

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/product-by-category/${category}`)
      .then((json) => setItems(json.data.products))
  }, [])
  if (loading) {
    return <div className='d-flex justify-content-center align-items-center' style={{ width: '100vw', height: '85vh' }}>
      <Spin tip="Loading..." size="large">
        <div className="content" />
      </Spin>
    </div>
  }
  return (
    <>
      <div className="text-center">
        <h2 className="text-success">Products by Category</h2>
        <small className='text-secondary'>"Experience convenience and choice: Shop shirts, shoes, electronics, groceries, and more in one place.</small>
      </div>
      <List
        className='bkgroundCard'
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon className='itemCardBadge' text={product.discountPercentage} color='green'>
              <Link to={`/products/${product._id}`} className='text-decoration-none'>
                <Card className='itemCard'
                  title={product.title} key={index} cover={<Image className='itemCardImage' src={product.thumbnail} />}
                  actions={[
                    <Rate allowHalf disabled value={product.rating} />, <Button type='link'><AiOutlineShoppingCart className='m-1' /> Add to Cart</Button>
                  ]}
                >
                  <Card.Meta title={
                    <Typography.Paragraph>
                      Price: ${product.price}{" "}
                      <Typography.Text delete type='danger'>
                        $
                        {parseFloat(product.price +
                          (product.price * product.discountPercentage) / 100).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                    description={<Typography.Paragraph ellipsis={{ rows: 1, expandable: true, symbol: 'more' }}>{product.description}</Typography.Paragraph>}

                  ></Card.Meta>
                </Card>
              </Link>
            </Badge.Ribbon>
          )
        }}
        dataSource={items}
      ></List>
    </>

  );
}

export default Products