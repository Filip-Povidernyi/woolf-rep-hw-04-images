import React, { Component } from 'react';
import css from './style.module.css';


class Searchbar extends Component {
    state = {
        query: '',
    };

    handlerChange = (evt) => {
        const query = evt.target.value;
        this.setState({ query });
    };

    render() {
        const { handlerSubmit } = this.props;
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={handlerSubmit}>
                    <button type="submit" className={css.button}>
                        <span className={css.buttonLabel}>Search</span>
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="input"
                        value={this.query}
                        onChange={this.handlerChange}
                    />
                </form>
            </header>
        )
    };
};

export default Searchbar;