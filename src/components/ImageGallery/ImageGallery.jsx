import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { nanoid } from 'nanoid';
import css from './style.module.css';


const ImageGallery = ({ data, openModal }) => {
    return (
        <ul className={css.gallery}>
            {data.map(({ id, tags, webformatURL, largeImageURL }) => (
                <ImageGalleryItem
                    key={`${id}${nanoid()}`}
                    tags={tags}
                    webformatURL={webformatURL}
                    openModal={openModal}
                    largeImageURL={largeImageURL}
                />
            ))}
        </ul>
    )
};

export default ImageGallery;