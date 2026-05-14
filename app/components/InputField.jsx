import React from 'react'

export default function InputField({ props }) {
  return (
    <input
      className=" w-[300px] bg-purple-300 p-2 rounded-[30px]"
      placeholder={props.placeholder}
      type={props.type}
      onChange={(event) => {
        props.inputValue(event.target.value);
      }}
    />
  )
}