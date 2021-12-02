import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' variant="dark" fluid="md">
        <Carousel.Item>
          <Link to={`/search/ready%20to%20wear`}>
            <Image 
              src='https://res.cloudinary.com/prolific-elegance/image/upload/c_crop,h_650,w_966/v1624719657/Untitled_Artwork_hrsi1m.jpg' 
              fluid 
            />
          
            <Carousel.Caption className='carousel-caption'>
             <h2> <Button variant="light">Shop Ready To Wear</Button> </h2>
            </Carousel.Caption>
          </Link>

        </Carousel.Item>
        <Carousel.Item>
          <Link to={`/search/custom%20wigs`}>
            <Image 
              src='https://res.cloudinary.com/prolific-elegance/image/upload/c_crop,h_650,w_966/v1624719652/Untitled_Artwork_uzio2y.jpg' 
              fluid 
            />
                        <Carousel.Caption className='carousel-caption'>
             <h2> <Button variant="light">Shop Custom Wigs</Button> </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      
    </Carousel>
  )
}

export default ProductCarousel