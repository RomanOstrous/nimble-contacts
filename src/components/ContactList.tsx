import { useGetContactsQuery } from "../store/api";
import { Contact } from "../types/ContactTypes";
import ContactCard from "./ContactCard";

const ContactsList: React.FC = () => {
  const { data, error, isLoading } = useGetContactsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  // Перевіряємо, чи data не є undefined і чи містить поле resources
  const contacts = data?.resources || [];

  return (
    <div className="contacts-list">
      {contacts.map((contact: Contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactsList;