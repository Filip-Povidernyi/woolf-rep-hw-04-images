import css from './style.module.css';

const Button = ({ handlerClick, children }) => {
    return (
        <div className={css.buttonWrapper}>
            <button type="button" className={css.button} onClick={handlerClick}>{children}</button>
        </div>
    );
};

export default Button;