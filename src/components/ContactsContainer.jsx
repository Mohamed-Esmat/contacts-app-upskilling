import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import {
  Contacts,
  NewContactBtn,
  PaginationContainer,
  SearchBar,
} from './index';
import classes from './ContactsContainer.module.css';

const ContactsContainer = () => {
  const { contacts } = useRouteLoaderData('contacts');
  console.log(contacts);

  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getSearchValue = (searchValue) => {
    setSearchValue(searchValue);
  };

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredContacts([]);
    } else {
      const filterContacts = contacts.filter((contact) => {
        const { firstName, lastName } = contact;
        return `${firstName} ${lastName}`
          .toLowerCase()
          .includes(`${searchValue}`);
      });
      setFilteredContacts(filterContacts);
    }
  }, [searchValue, contacts]);

  return (
    <div className={classes['contacts']}>
      <div className={`${classes['contacts__container']}`}>
        {/* SEARCH */}
        <SearchBar onSearch={getSearchValue} />

        {/* NEW CONTACT BTN */}
        <div className={classes["align-content"]}>
          <NewContactBtn />
        </div>

        {/* CONTACTS */}
        {searchValue.trim() === '' ? (
          <Contacts contacts={contacts} />
        ) : (
          <Contacts contacts={filteredContacts} />
        )}
        {filteredContacts.length === 0 && searchValue.trim() !== '' && (
          <p className="text-white flex justify-center bg-slate-400 p-8 rounded-3xl">
            there is no such a contact !!
          </p>
        )}

        {/* PAGINATION */}
        <PaginationContainer />
      </div>
    </div>
  );
};

export default ContactsContainer;
