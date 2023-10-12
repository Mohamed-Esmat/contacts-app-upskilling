import { customFetch } from '../utils';
import UpdateContact from '../components/UpdateContact';

export const loader = async ({ params }) => {
  const response = await customFetch(params.contactId, {
    headers: {
      'Content-Type': 'application/json',
      'app-id': '652808477418632024e30e89',
    },
  });
  // console.log(response.data);
  const contact = response.data;
  // console.log(contact);
  return { contact };
  // return null;
};

const EditContact = () => {
  return <UpdateContact />;
};

export default EditContact;
