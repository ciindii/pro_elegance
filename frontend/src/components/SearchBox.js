import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'

const Styles = styled.div`
  .form-control {
    height: 25px;
  }
  @media only screen and (min-width: 320px) {
    .form-control {
      width: 200px;
      height: 40px;
      padding: 10px 0;
    }
  }
  
  @media (min-width: 576px)
  .mr-sm-2 .ml-sm-5 {
      margin-left: 0.5rem!important;
  }
  @media (min-width: 576px)
    .form-inline .form-control {
      display: inline-block;
      width: 60%;
    }
  }
`

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Styles>
      <Form onSubmit={submitHandler} size="sm" inline>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='  Search Products...'
          
        ></Form.Control>
        <Button type='submit' className='p-2'>
          Search
        </Button>
      </Form>
    </Styles>
  )
}

export default SearchBox