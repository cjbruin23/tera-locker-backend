import { GetBucketTaggingCommand, S3Client } from "@aws-sdk/client-s3";

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

export const uploadToS3 = async (filename: string) => {
  const bucketARN = `${process.env["S3_BUCKET"]}`;
  console.log("bucketArn", bucketARN);
  console.log("filename", filename);
  const client = createS3Client();

  const command = new GetBucketTaggingCommand({
    Bucket: bucketARN,
  });

  const response = await client.send(command);
  console.log("response", response);
};
