import {Request} from "express";
import {S3} from "../config/s3.config";
import {CompleteMultipartUploadCommand, CreateMultipartUploadCommand, UploadPartCommand} from "@aws-sdk/client-s3";

export const uploadStream = async (req: Request, Id: number, version: string, directoryName: string) => {
    const Bucket = process.env.AWS_S3_BUCKET;
    const Key = `${directoryName}/${Id}/${version}/main.zip`;
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

    const createRes = await S3.send(new CreateMultipartUploadCommand({ Bucket, Key }));
    const uploadId = createRes.UploadId;

    if (!uploadId) throw new Error("Failed to initiate multipart upload");

    const parts = [];
    let buffer = Buffer.alloc(0);
    let partNumber = 1;

    for await (const chunk of req) {
        buffer = Buffer.concat([buffer, chunk]);

        while (buffer.length >= CHUNK_SIZE) {
            const body = buffer.subarray(0, CHUNK_SIZE);
            buffer = buffer.subarray(CHUNK_SIZE);

            const uploadPart = await S3.send(new UploadPartCommand({
                Bucket,
                Key,
                UploadId: uploadId,
                PartNumber: partNumber,
                Body: body
            }));

            parts.push({ PartNumber: partNumber, ETag: uploadPart.ETag });
            partNumber++;
        }
    }

    if (buffer.length > 0) {
        const uploadPart = await S3.send(new UploadPartCommand({
            Bucket,
            Key,
            UploadId: uploadId,
            PartNumber: partNumber,
            Body: buffer
        }));
        parts.push({ PartNumber: partNumber, ETag: uploadPart.ETag });
    }

    await S3.send(new CompleteMultipartUploadCommand({
        Bucket,
        Key,
        UploadId: uploadId,
        MultipartUpload: { Parts: parts }
    }));

    return Key;
}