import BreadCrumbs from '../Components/BreadCrumbs'
import { Helmet } from 'react-helmet-async'

function BarChart() {
  return (
    <div>
      <Helmet>
        <title>Bar Chart</title>
      </Helmet>
      <BreadCrumbs Title={"Bar Chart"} Subtitle={"Manage your Bar Chart as you want"} />

    </div>
  )
}

export default BarChart