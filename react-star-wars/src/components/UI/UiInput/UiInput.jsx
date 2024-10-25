import PropTypes from "prop-types"
import { IoClose } from "react-icons/io5"
import styles from "./UiInput.module.scss"
import cn from "classnames"

const UiInput = ({ value, handleSearch, placeholder, classes }) => {
  const handleInputClear = () => {
    handleSearch("")
  }

  return (
    <div className={cn(styles.container, classes)}>
      <input
        type='text'
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      <IoClose
        className={cn(styles.close, `${value ? "" : styles.disabled}`)}
        onClick={handleInputClear}
      />
    </div>
  )
}

UiInput.propTypes = {
  value: PropTypes.string,
  handleSearch: PropTypes.func,
  placeholder: PropTypes.string,
  classes: PropTypes.string,
}

export default UiInput
