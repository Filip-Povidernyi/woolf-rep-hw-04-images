import React, { Component } from 'react';
import { RotatingLines } from 'react-loader-spinner'
import css from './style.module.css';



class Loader extends Component {

    render() {
    const { isLoading } = this.props;
        return (
            <div className={css.wrapper}>
                <RotatingLines
                    visible={isLoading}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    />
            </div>)
    }
};


export default Loader;