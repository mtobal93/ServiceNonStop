import './SingleImageModal.css';

function SingleImageModal({ imageUrl }) {

    return (
        <>
            <img className="singlePhoto" src={imageUrl} />
        </>
    )
}

export default SingleImageModal
