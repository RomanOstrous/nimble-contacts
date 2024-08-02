import React from 'react';
import { Link } from 'react-router-dom';
import { Contact } from '../types/ContactTypes';
import { useDeleteContactMutation } from '../store/api';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const [deleteContact] = useDeleteContactMutation();
  
  const handleDelete = () => {
    deleteContact(contact.id);
  };

  return (
    <div className="contact-card">
      <Link to={`/contact/${contact.id}`}>
        <img src={contact.avatar_url} alt={`${contact.firstName} ${contact.lastName}`} />
        <div>{contact.firstName} {contact.lastName}</div>
        <div>{contact.email}</div>
        <div>{contact.tags.join(', ')}</div>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ContactCard;
