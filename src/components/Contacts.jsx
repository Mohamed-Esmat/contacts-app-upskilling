import classes from './Contacts.module.css';
import SingleContact from './SingleContact';

const Contacts = ({ contacts }) => {
  return (
    <div className={classes['contacts']}>
      {contacts.map((contact) => {
        return <SingleContact key={contact.id} {...contact} />;
      })}
    </div>
  );
};

export default Contacts;
