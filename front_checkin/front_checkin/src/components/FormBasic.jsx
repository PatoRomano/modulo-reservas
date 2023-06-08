import React from 'react'
import { useForm } from 'react-hook-form'

const FormBasic = ({ fields, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const customSubmit = (data) => {
    console.log(data)
    onSubmit(data)
  }

  return (
    <>
      <h2>Form Basic</h2>
      <form onSubmit={handleSubmit(customSubmit)} className='form-react'>
        {fields.map((field) => (
          <div className='form-control' key={field.name}>
            <label>{field.label}</label>
            {field.type === 'text' && (
              <>
                <input
                  type={field.type}
                  {...register(field.name, {
                    required: true,
                    maxLength: 20 // Ejemplo de validación adicional
                  })}
                />
                {errors[field.name] && (
                  <span>This field is required and should be less than 20 characters</span>
                )}
              </>
            )}
            {field.type === 'number' && (
              <>
                <input
                  type={field.type}
                  {...register(field.name, {
                    required: true,
                    min: 18, // Ejemplo de validación adicional
                    max: 99 // Ejemplo de validación adicional
                  })}
                />
                {errors[field.name] && (
                  <span>This field is required and should be between 18 and 99</span>
                )}
              </>
            )}
          </div>
        ))}
        <button type='submit'>Send</button>
      </form>
    </>
  )
}

export default FormBasic