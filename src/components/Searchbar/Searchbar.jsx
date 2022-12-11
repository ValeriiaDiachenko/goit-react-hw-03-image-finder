import PropTypes from 'prop-types';
import { Component } from 'react';
import styles from 'components/Searchbar/Searchbar.module.css'
import { IconContext } from 'react-icons';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      toast.warning('Enter data in the search field!');
      return;
    }
    this.props.onSubmit(this.state.value);
    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm_button}>
            <IconContext.Provider value={{ size: '1.5em' }}>
              <div>
                <FiSearch />
              </div>
            </IconContext.Provider>

            <span className={styles.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={value}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};