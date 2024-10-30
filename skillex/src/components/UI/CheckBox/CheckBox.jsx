import "./CheckBox.scss"

const CheckBox = ({ id }) => {
  return (
    <div className='content'>
      <label className='checkBox'>
        <input
          type='checkbox'
          id={id}
        />
        <div className='transition'></div>
      </label>
    </div>
  )
}
export default CheckBox
