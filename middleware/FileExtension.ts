const RequireMultipartContent = (request, response, next) => {
  const rawContentType = request.headers["content-type"] as string;
  if (!rawContentType.includes("multipart/form-data")) {
    response.status(400).send("Server requires multipart/form-data");
  } else {
    console.log("file is multipart-upload");
    next();
  }
};

export default RequireMultipartContent;
