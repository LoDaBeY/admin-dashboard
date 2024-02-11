import BreadCrumbs from '../Components/BreadCrumbs'
import React from 'react'
import { Helmet } from 'react-helmet-async'

function Chart() {
  return (
    <div>
      <Helmet>
        <title>Chart</title>
      </Helmet>
      <BreadCrumbs Title={"Chart"} Subtitle={"Manage your Chart as you want"} />
      
    </div>
  )
}

export default Chart