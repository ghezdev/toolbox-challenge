import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Searcher = ({ loading, options = [], onChange }) => {
  const handleOnChange = event => {
    const optionSelected = event.target.value
    onChange(optionSelected)
  }

  return (
    <div className='ms-auto'>
      <Form.Select onChange={handleOnChange} style={{ width: '200px' }}>
        {loading ? (
          <option>Loading...</option>
        ) : (
          options.map((option, index) => (
            <option key={`${option}-option-${index}`} value={option}>
              {option.split('.')[0]}
            </option>
          ))
        )}
      </Form.Select>
    </div>
  )
}

Searcher.propTypes = {
  loading: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired
}

export default Searcher
