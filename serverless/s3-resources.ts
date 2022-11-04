import { AWS } from "@serverless/typescript";

export const S3: AWS["resources"]["Resources"] = {
  WebsiteBucket: {
    Type: "AWS::S3::Bucket",
    Properties: {
      BucketName: "${self:custom.websiteBucketName}",
      AccessControl: "PublicRead",
      WebsiteConfiguration: {
        IndexDocument: "index.html",
      },
    },
  },
  WebsiteBucketPolicy: {
    Type: "AWS::S3::BucketPolicy",
    Properties: {
      Bucket: {
        Ref: "WebsiteBucket",
      },
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Principal: "*",
            Resource: {
              "Fn::Join": [
                "",
                ["arn:aws:s3:::", { Ref: "WebsiteBucket" }, "/*"],
              ],
            },
            Action: "s3:GetObject",
            Effect: "Allow",
          },
        ],
      },
    },
  },
};
