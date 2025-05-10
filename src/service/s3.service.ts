import {S3} from "../config/s3.config";
import {GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export async function getPresignedUrl(key: string): Promise<string> {
    const expiresInSec = Number(process.env.AWS_S3_EXPIRES_IN) || 600;

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
        });

        return await getSignedUrl(S3, command, { expiresIn: expiresInSec });
    } catch (error) {
        console.error("Failed to generate presigned URL:", error);
        throw new Error("Failed to generate presigned URL");
    }
}