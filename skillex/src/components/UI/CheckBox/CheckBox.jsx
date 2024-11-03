import "./CheckBox.scss"

const CheckBox = ({ id, onChange, checked }) => {
  return (
    <div className='content'>
      <label className='checkBox'>
        <input
          type='checkbox'
          id={id}
          onChange={onChange}
          checked={checked}
        />
        <div className='transition'></div>
      </label>
    </div>
  )
}
export default CheckBox
