class ImageUploader {
    async upload(blob){

        console.log("들어옴????");
        const data = new FormData();
        data.append('file', blob);
        data.append('upload_preset', 'j0olf3vr');

        
        const res = await fetch (
            'https://api.cloudinary.com/v1_1/daomkhvu8/upload',
            {
                method : 'POST',
                body: data,
            }
        );
        return await res.json();

    }
}

export default ImageUploader;