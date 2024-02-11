import BreadCrumbs from "../Components/BreadCrumbs";
import { Helmet } from "react-helmet-async";

function Projects() {
  return (
    <div>
      <Helmet>
        <title>Projects</title>
      </Helmet>
      <BreadCrumbs
        Title={"Projects"}
        Subtitle={"Manage your Projects as you want"}
      />
    </div>
  );
}

export default Projects;
