import { Injectable } from '@nestjs/common';
import * as AWS from '@aws-sdk/client-s3'

@Injectable()
export class AwsService {
    private s3 = new AWS.S3Client({
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.accesskey_bucket ?? "",
            secretAccessKey: process.env.secretkey_bucket ?? "",
        }
    })

    async uploadFile(file: Express.Multer.File) {
        const key = file.originalname
        const url = `https://nest-ocso-test518.s3.amazonaws.com/${key}`
        const bucket = "nest-ocso-test518"
        const command = new AWS.PutObjectCommand({
            Key: key,
            Body: file.buffer,
            Bucket: bucket,
        })
        await this.s3.send(command)
        return url;
    }
}
