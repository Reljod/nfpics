import type { InputFormMeta } from 'interfaces/forms'
import { convTextToIdForm } from 'lib/utils/strutils'
import React from 'react'

type Props = {
  meta: InputFormMeta
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputForm = (props: Props) => {
  const id = convTextToIdForm(props.meta.label)

  return (
    <div className="flex justify-center items-center">
      <label htmlFor={id}>{props.meta.placeholder}</label>
      <input
        type="text"
        id={id}
        className="px-2 py-1 m-1 border border-gray-500` rounded-md"
        placeholder={props.meta.placeholder}
        onChange={props.onChange}
      />
    </div>
  )
}

export default InputForm
