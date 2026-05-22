import aliaImage from "../../images/Alia.jpeg";
import awsImage from "../../images/aws.png";
import dockerImage from "../../images/docker.png";
import reactImage from "../../images/react.png";
import tailwindImage from "../../images/tailwind.jpg";

const imageByKey = {
  analytics: tailwindImage,
  api: dockerImage,
  aws: awsImage,
  budget: reactImage,
  cloud: awsImage,
  docker: dockerImage,
  react: reactImage,
  school: reactImage,
  tailwind: tailwindImage
};

export const portraitImage = aliaImage;

export const getProjectImage = (project) => {
  if (project?.imageUrl) {
    return project.imageUrl;
  }

  const key = String(project?.image || "").toLowerCase();
  const techs = (project?.technologies || []).join(" ").toLowerCase();

  if (imageByKey[key]) {
    return imageByKey[key];
  }

  if (techs.includes("aws") || techs.includes("s3") || techs.includes("ec2")) {
    return awsImage;
  }

  if (techs.includes("docker")) {
    return dockerImage;
  }

  if (techs.includes("tailwind")) {
    return tailwindImage;
  }

  return reactImage;
};
