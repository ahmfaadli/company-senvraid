import { useParams } from "react-router-dom";

function ProjectDetail() {
  const { id } = useParams();

  const projects = {
    1: {
      title: "Food Ordering App",
      desc: "React & Laravel",
    },
    2: {
      title: "IoT Monitoring",
      desc: "ESP32 Dashboard",
    },
    3: {
      title: "Company Profile",
      desc: "Modern Website",
    },
  };

  const project = projects[id];

  if (!project) {
    return <h1 className="p-10">Project Not Found</h1>;
  }

  return (
    <div className="py-24 px-10">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-400">{project.desc}</p>
    </div>
  );
}

export default ProjectDetail;