import BreadCrumbs from '../Components/BreadCrumbs'
import { Helmet } from 'react-helmet-async'

function GeographyChart() {
  return (
    <div>
      <Helmet>
        <title>Geography Chart</title>
      </Helmet>
      <BreadCrumbs Title={"Geography Chart"} Subtitle={"Manage your Geography Chart as you want"} />


    </div>
  )
}

export default GeographyChart