import BreadCrumbs from '../Components/BreadCrumbs'
import { Helmet } from 'react-helmet-async'

function Invoices() {
  return (
    <div>
            <Helmet>
        <title>Invoices</title>
      </Helmet>
      <BreadCrumbs Title={"Invoices"} Subtitle={"HR System for managing list of invoices"} />

    </div>
  )
}

export default Invoices