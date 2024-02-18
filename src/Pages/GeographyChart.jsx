import { Box } from '@mui/material'
import BreadCrumbs from '../Components/BreadCrumbs'
import { Helmet } from 'react-helmet-async'
import Geography from '../Components/Geography'

function GeographyChart() {
  return (
    <div>
      <Helmet>
        <title>Geography Chart</title>
      </Helmet>
      <BreadCrumbs Title={"Geography Chart"} Subtitle={"Manage your Geography Chart as you want"} />
      <Box sx={{mt: 2}}>
        <Geography/>
      </Box>

    </div>
  )
}

export default GeographyChart