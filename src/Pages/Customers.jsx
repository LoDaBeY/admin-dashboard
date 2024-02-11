import BreadCrumbs from '../Components/BreadCrumbs'
import { Helmet } from 'react-helmet-async'

function Customers() {
  return (
    <div>
      <Helmet>
        <title>Customers</title>
      </Helmet>
      <BreadCrumbs Title={"Customers"} Subtitle={"Manage your Customers as you want"} />


    </div>
  )
}

export default Customers