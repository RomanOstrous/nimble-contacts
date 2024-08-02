import { useForm } from 'react-hook-form';
import '../styles/components/Form.css';
import { useState } from 'react';
import { useCreateContactMutation } from '../store/api';
import { NewContact } from '../types/ContactTypes';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [createContact] = useCreateContactMutation();

  const handleButton = async () => {
    const newContact: NewContact = {
      record_type: 'person',
      'first name': [{ value: firstName, modifier: '', label: 'first name' }],
      'last name': [{ value: lastName, modifier: '', label: 'last name' }],
      email: [{ value: email, modifier: '', label: 'email' }],
      privacy: { edit: null, read: null },
      owner_id: null,
    };
    await createContact(newContact);
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  return (
    <form className="w-[280px] flex flex-col gap-3" onSubmit={handleSubmit(handleButton)}>
      <label htmlFor="first" className="form-label">
        <span className="form-text">First name</span>
        <input
          id="first"
          type="text"
          className={`form-input ${errors.first ? 'border-red-500' : ''}`}
          {...register('first', {
            required: firstName || !lastName ? 'First name is required' : false,
            pattern: {
              value: /^[A-Z][a-zA-Z]*$/,
              message: 'Enter a valid first name'
            } 
          })}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <span className="form-error">
          {errors.first && <p className="form-error">{errors.first.message?.toString()}</p>} 
        </span>
      </label>

      <label htmlFor="last" className="form-label">
        <span className="form-text">Last name</span>
        <input
          id="last"
          type="text"
          className={`form-input ${errors.last ? 'border-red-500' : ''}`}
          {...register('last', { 
            required: lastName || !firstName ? 'Last name is required' : false,
            pattern: {
              value: /^[A-Z][a-zA-Z]*$/,
              message: 'Enter a valid last name'
            } 
          })}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <span className="form-error">
          {errors.last && <p className="form-error">{errors.last.message?.toString()}</p>}
        </span>
      </label>

      <label htmlFor="email" className="form-label">
        <span className="form-text">Email</span>
        <input
          id="email"
          type="email"
          className={`form-input ${errors.email ? 'border-red-500' : ''}`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="form-error">
          {errors.email && <p className="form-error">{errors.email.message?.toString()}</p>}
        </span>
      </label>

      <button type="submit" className="h-[44px] border rounded-md border-gray-400">
        Add Contact
      </button>
    </form>
  )
}

export default ContactForm;
