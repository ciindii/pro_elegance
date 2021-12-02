import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Prolific ELegance',
  description: 'Custom Wigs, Laces and Extentions',
  keywords: 'Custom Wigs, Laces, Extentions, Hair',
}

export default Meta