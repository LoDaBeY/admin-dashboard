import BreadCrumbs from '../Components/BreadCrumbs'
import React from 'react'
import { Helmet } from 'react-helmet-async'

function Form() {
  return (
    <div>
      <Helmet>
        <title>BarChart</title>
      </Helmet>
      <BreadCrumbs Title={"Form"} Subtitle={"Make your Form as you want to sent it to the Manager"} />
      
    </div>
  )
}

export default Form