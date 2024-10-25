import { useState } from "react"
import UiInput from "./UiInput"

export default {
  title: "UI-Kit/UiInput",
  component: UiInput,
}

const Template = (args) => {
  const [value, setValue] = useState("")

  const handleInputChange = (value) => setValue(value)

  return (
    <UiInput
      {...args}
      value={value}
      handleSearch={handleInputChange}
    />
  )
}

const props = {
  value: "",
  handleInputChange: () => {},
  placeholder: "Search",
  classes: "",
}

export const Default = Template.bind({})

Default.args = {
  ...props,
}
