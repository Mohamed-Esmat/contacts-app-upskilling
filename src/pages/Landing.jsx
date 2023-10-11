import { useRouteLoaderData } from 'react-router-dom';
import ContactsContainer from '../components/ContactsContainer';
import { customFetch } from '../utils';
import { useDispatch } from 'react-redux';
import { requestActions } from '../store/request-slice';

// const contactsQuery = {
//   queryKey: ['contacts-cache'],
//   queryFn: ({ queryKey }) => {
//     const params = Object.fromEntries([
//       ...new URL(queryKey[1]).searchParams.entries(),
//     ]);
//     return customFetch({
//       params,
//       headers: {
//         'Content-Type': 'application/json',
//         'app-id': '64fc4a747b1786417e354f31',
//       },
//     });
//   },
// };

const contactsQuery = (requestUrl) => {
  return {
    queryKey: ['contacts-cache', requestUrl],
    queryFn: () => {
      const params = Object.fromEntries([
        ...new URL(requestUrl).searchParams.entries(),
      ]);
      return customFetch({
        params,
        headers: {
          'Content-Type': 'application/json',
          'app-id': '64fc4a747b1786417e354f31',
        },
      });
    },
  };
};
//

export const loader =
  (queryClient) =>
  async ({ request }) => {
    // console.log(request.url);
    // const params = Object.fromEntries([
    //   ...new URL(request.url).searchParams.entries(),
    // ]);
    // const queryKey = ['contacts-cache', request.url];
    // console.log('params',params);
    // const response = await queryClient.ensureQueryData({
    //   ...contactsQuery,
    //   queryKey,
    // });
    const response = await queryClient.ensureQueryData(contactsQuery(request.url));
    // console.log(response);
    const contacts = response.data.data;
    const limit = response.data.limit;
    const page = response.data.page;
    const total = response.data.total;
    const meta = { limit, page, total };

    const requestUrl = request.url;
    return { contacts, meta, requestUrl };
  };

const Landing = () => {
  const { requestUrl } = useRouteLoaderData('contacts');
  const dispatch = useDispatch();

  dispatch(requestActions.setRequest(requestUrl));
  return (
    <>
      <ContactsContainer />
    </>
  );
};

export default Landing;
