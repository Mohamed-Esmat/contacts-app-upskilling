import { customFetch } from '../utils';
import UpdateContact from '../components/UpdateContact';

export const loader = async ({ params }) => {
  const response = await customFetch(params.contactId, {
    headers: {
      'Content-Type': 'application/json',
      'app-id': '64fc4a747b1786417e354f31',
    },
  });
  console.log(response.data);
  const contact = response.data;
  return { contact };
  // return null;
};

const EditContact = () => {
  // const params = useParams();
  // console.log(params);
  // const { contacts } = useRouteLoaderData('contacts');
  // const contact = contacts.find((cont) => cont.id === params.id);
  // console.log(contact);
  return <UpdateContact />;
};

export default EditContact;
