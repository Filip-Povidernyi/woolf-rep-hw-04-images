const ImageGalleryItem = ({ tags, webformatURL, openModal, largeImageURL }) => {
    return (
        <li className={CSS.galleryItem}>
            <img src={webformatURL} alt={tags} onClick={() => openModal(largeImageURL, tags)} />
        </li>
    )
};

export default ImageGalleryItem;