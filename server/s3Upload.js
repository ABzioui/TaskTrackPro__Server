import AWS from 'aws-sdk';
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION
});

export const uploadToAws = async (req, res) => {
    try {
        const { fileBuffer, fileName, fileType } = req.body;  // Assuming fileBuffer, fileName, and fileType are passed from the frontend

        // Upload the file directly to S3
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: Buffer.from(fileBuffer, 'base64'),  // Assuming fileBuffer is base64 encoded
            ContentType: fileType  // This helps S3 understand the type of file being uploaded
            // Remove ACL: 'public-read' since ACLs are not supported on this bucket
        };

        const uploadResult = await s3.upload(params).promise();

        res.json({ msg: 'File uploaded successfully', url: uploadResult.Location });
    } catch (err) {
        console.log("Error uploading to S3:", err);
        res.status(500).json({ msg: 'Error occurred while uploading', error: err.message });
    }
};
