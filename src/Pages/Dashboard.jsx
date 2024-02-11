import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";

function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <BreadCrumbs Title={"Dashboard"} Subtitle={"Welcome to your dashboard"} />
    </div>
  );
}

export default Dashboard;
