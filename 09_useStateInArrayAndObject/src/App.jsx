import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    firstName : 'Shan',
    lastName : 'Kumar',
    Email : 'Shan@google.com'
  })

  return (
    <>
      <label>
        First name : 
        <input 
        type="text" 
        value={form.firstName}
        onChange={e => {
          setForm(
            {...form,
            firstName : e.target.value,}
          )
        }} 
        />
      </label>
      <label>
        Last Name : 
        <input 
        type="text" 
        value={form.lastName}
        onChange={e => {
          setForm(
            {...form,
            lastName : e.target.value,}
          )
        }} 
        />
      </label>
      <label>
        Email : 
        <input 
        type="text" 
        value={form.Email}
        onChange={e => {
          setForm(
            {...form,
            Email : e.target.value,}
          )
        }} 
        />
      </label>
      <p>
        {form.firstName}{' '}
        {form.lastName}{' '}
        ({form.Email})
      </p>
    </>
  );
}