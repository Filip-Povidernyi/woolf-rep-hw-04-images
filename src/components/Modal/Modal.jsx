import React, {Component} from 'react';
import css from './style.module.css';



class Modal extends Component {


    handleClick = (evt) => {
        if (evt.currentTarget === evt.target) {
            this.props.modalIsClose();
        };
    };

    onPressEsc = (evt) => {
        if (evt.code === 'Escape') {
            this.props.modalIsClose();
        };
    };

    componentDidMount() {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        window.addEventListener('keyup', this.onPressEsc);
    };

    componentWillUnmount() {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
        window.removeEventListener('keyup', this.onPressEsc);
    };

    render() {
    const { bigImage } = this.props;
    return (
        <div className={css.overlay} onClick={this.handleClick}>
            <div className={css.modal}>
                <img src={bigImage.url} alt={bigImage.tags} />
            </div>
        </div>
    )
}
};


export default Modal;