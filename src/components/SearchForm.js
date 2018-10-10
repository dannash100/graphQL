import React from 'react'
import PropTypes from 'prop-types'

class SearchForm extends React.Component {
    
    handleChange = e => {
        this.props.searchAction(e.target.value)
    }

    render() {
        return(
            <form className="navbar-form" role="search">
                <input type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={this.handleChange}/>
            </form>
        )
    }
}

SearchForm.propTypes = {
    searchAction: PropTypes.func.isRequired
}

export default SearchForm