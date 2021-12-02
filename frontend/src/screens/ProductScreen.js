import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Image, ListGroup, Card, Button, Form, Container} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta'
import {listProductDetails, createProductReview} from '../actions/productActions';
import {addToCart} from '../actions/cartActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

//import products from '../products';

const Styles = styled.div`

img{
  display: block;
  cursor: pointer;
}

.container{
  margin: auto;
  width: 100%;
  max-width: 540px;
}

.container .selected{
  height: 420px;
  border: 1px solid white;
}

.container .imgContainer{
  width: 20%;
  display: flex;
  justify-content: space-between;
  // flex-wrap: wrap;
  padding: 0 0 0 0;
}

.container .imgContainer img{
  width: 100%;
  height: 100%;
  margin: 50px 0;
}

@media only screen and (max-width: 425px) {
  .qtyForm {
    width: 100%;
  }
}
`

const ProductScreen = ({history, match}) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails)
  const {loading, error, product} = productDetails;

  
  const Images = [product.image, product.image1, product.image2]
  const [selectedImg, setSelectedImg] = useState(Images[0])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview, product._id])

  const addToCartHandler = () => {
       dispatch(addToCart(product._id, qty))
       history.push('/cart')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  // const addToCartHandler = () => {
  //   history.push(`/cart/${match.params.id}?qty=${qty}`)
  // }
  return (
    <Styles>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Meta title={product.name} />
        <Row>
          <div className="container">
            <img src={selectedImg} alt='Selected' className='selected' />
            <div className='imgContainer'>
              {Images.map((img) => (
                <img
                  style={{border: selectedImg === img ? "1px solid white" : ""}}
                  key={product._id}
                  src={img}
                  alt={product.name}
                  onClick={() => setSelectedImg(img)}
                />
              ))} 
            </div>
          </div>
          {/* <Col md={6} className='product-page-section'>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6} className='product-page-section'>
            <Image src={product.image1} alt={product.name} fluid />
          </Col>
          <Col md={6} className='product-page-section'>
            <Image src={product.image2} alt={product.name} fluid />
          </Col> */}

          

          <Col md={3} className='product-page-section'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
              </ListGroup.Item>
              <ListGroup.Item>
                Price: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} className='product-page-section'>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col className='product-page-section'>
                      Price:
                    </Col>
                    <Col className='product-page-section'>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col className='product-page-section'>
                      Status:
                    </Col>
                    <Col className='product-page-section'>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col className='product-page-section'>Qty</Col>
                      <Col>
                        <Form.Control
                          className='qtyForm'
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0 }>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
          <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
          </Col>
        </Row>
        </>
      )}
    </Styles>
  )
};

export default ProductScreen;
