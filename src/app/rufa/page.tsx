'use client';

import { useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  email: string;
};

export default function ExampleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form
      className="mt-50 flex flex-col p-20 gap-20 bg-cyan-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register('name')} placeholder="Name" />

      <input
        {...register('email', {
          required: 'Email is required',
        })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
