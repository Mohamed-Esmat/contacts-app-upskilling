import { customFetch } from '../utils';
import UpdateContact from '../components/UpdateContact';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

/*
const contactEdit = {
  queryKey: ['edit-contact-cache'],
  queryFn: ({ contactId }) =>
    customFetch({id: contactId}, {
      headers: {
        'Content-Type': 'application/json',
        'app-id': '64fc4a747b1786417e354f31',
      },
    }),
};

export const loader =
  (queryClient) =>
    async ({ params }) => {
      console.log(params);
      console.log(params.contactId);
    const id = params.contactId;
    const queryKey = ['edit-contact-cache', id];
    const response = await queryClient.ensureQueryData({
      ...contactEdit,
      queryKey,
    });
    // console.log(response.data);
    const contact = response.data;
    return { contact };
    // return null;
  };
*/

// const contactEdit = {
//   queryKey: ['edit-contact-cache'],
//   queryFn: ({ queryKey }) =>
//     customFetch( queryKey[1] , {
//       headers: {
//         'Content-Type': 'application/json',
//         'app-id': '64fc4a747b1786417e354f31',
//       },
//     }),
// };

const contactEdit = (contactId) => {
  return {
    queryKey: ['edit-contact-cache', { id: contactId }],
    queryFn: () =>
      customFetch(contactId, {
        headers: {
          'Content-Type': 'application/json',
          'app-id': '64fc4a747b1786417e354f31',
        },
      }),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    // const queryKey = ['edit-contact-cache', params.contactId];
    // const response = await queryClient.ensureQueryData({
    //   ...contactEdit,
    //   queryKey,
    // });
    const response = await queryClient.ensureQueryData(
      contactEdit(params.contactId)
    );
    console.log(response.data);
    const contact = response.data;
    return { contact };
    // return null;
  };

const EditContact = () => {
  const params = useParams();
  const { data, inPending, isError, error } = useQuery({
    queryKey: ['edit-contact-cache', { id: params.contactId }],
    queryFn: () =>
      customFetch(params.contactId, {
        headers: {
          'Content-Type': 'application/json',
          'app-id': '64fc4a747b1786417e354f31',
        },
      }),
  });
  return <UpdateContact />;
};

export default EditContact;
