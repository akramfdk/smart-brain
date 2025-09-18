import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    // console.log(box);
    return (
        <div className="center ma">
            <div className="relative mt2">
                {imageUrl && <img id="inputimage" src={imageUrl} alt="" width="500px" height="auto" />}
                {box && <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>}
            </div>
        </div>
    )
}

// https://samples.clarifai.com/face-det.jpg

export default FaceRecognition;