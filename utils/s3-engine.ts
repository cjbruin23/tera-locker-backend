import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const createS3Client = () => {
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: `${process.env["S3_BUCKET_ACCESS_KEY"]}`,
      secretAccessKey: `${process.env["S3_BUCKET_ACCESS_SECRET"]}`,
    },
    region: "us-east-2",
  });
  return s3Client;
};

export const uploadToS3 = async (
  originalFilename: string,
  destination: string
) => {
  const bucketName = `${process.env["S3_BUCKET"]}`;
  const client = createS3Client();

  const input = {
    Body: `${destination}`,
    Key: `${originalFilename}`,
    Bucket: `${bucketName}`,
    ServerSideEnvryption: "AES256",
  };
  const putCommand = new PutObjectCommand(input);
  const response = await client.send(putCommand);
  console.log("response", response);
};