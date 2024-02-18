import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";

import Bar from "../Components/Bar";

function BarChart() {
  return (
<div>
<Helmet>
      <title>Bar Chart</title>
    </Helmet>
    <BreadCrumbs
      Title={"Bar Chart"}
      Subtitle={"Manage your Bar Chart as you want"}
    />
    
  <Bar/>
</div>
  );
}

export default BarChart;
