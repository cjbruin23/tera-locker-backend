import { S3Client } from "@aws-sdk/client-s3";

const createS3Client = () => {
  const s3Client = new S3Client({ region: "" });
};

const uploadToS3 = (filename: string) => {};
