import { useEffect } from 'react';
import css from './style.module.css';



const Modal = (props) => {


    const handleClick = (evt) => {
        if (evt.currentTarget === evt.target) {
            props.modalIsClose();
        };
    };

    const onPressEsc = (evt) => {
        if (evt.code === 'Escape') {
            props.modalIsClose();
        };
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        window.addEventListener('keydown', onPressEsc);
        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            window.removeEventListener('keydown', onPressEsc);
        }
    });

    return (
        <div className={css.overlay} onClick={handleClick}>
            <div className={css.modal}>
                <img src={props.bigImage.url} alt={props.bigImage.tags} />
            </div>
        </div>
    )
};


export default Modal;