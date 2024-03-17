import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async (file) => {
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
    });

    const s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: process.env.REACT_APP_S3_BUCKET },
        region: process.env.REACT_APP_S3_REGION,
    });

    const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: uuidv4(),
        Body: file,
        ContentType: file.type,
    };

    try {
        const result = await s3.upload(params).promise();
        return { url: result.Location, success: true };
        // Here you can update the state or call a parent component method to handle the uploaded image URL
    } catch (error) {
        return { success: false };
    }
};
