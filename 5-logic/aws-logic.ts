import { s3bucket } from "../2-utils/aws_dal";

export async function saveImagesToS3(file: any, imageId: string) {
    try {
        const type = file.image.name.split('.')[1];
        const params = {
            Body: file.image.data,
            Key: `${imageId}.${type}`,
            Bucket: 'daniel-vacation'
        }
        await s3bucket.upload(params).promise()
        return params.Key
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`)
    }
}

export async function deleteImageFromS3(imageId: string) {
    const params = { Bucket: 'daniel-vacation', Key: imageId };
    try {
        const results = await s3bucket.deleteObject(params).promise();
        return results
    } catch (err) {
        console.log(err);
    }
}