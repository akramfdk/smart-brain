const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className="center ma mt2">
            <img src={imageUrl} alt="" width="500px" height="auto" />
        </div>
    )
}

// https://samples.clarifai.com/face-det.jpg

export default FaceRecognition;