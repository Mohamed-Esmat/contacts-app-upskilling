import ContactsContainer from '../components/ContactsContainer';
import { customFetch } from '../utils';

export const loader = async ({ request }) => {
  // console.log(request.url);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  // console.log('params',params);
  const response = await customFetch({
    params,
    headers: {
      'Content-Type': 'application/json',
      'app-id': '64fc4a747b1786417e354f31',
    },
  });
  // console.log(response);
  const contacts = response.data.data;
  const limit = response.data.limit;
  const page = response.data.page;
  const total = response.data.total;
  const meta = { limit, page, total };
  // console.log(meta);
  return { contacts, meta };
  // return null;
};

const Landing = () => {
  return (
    <>
      <ContactsContainer />
    </>
  );
};

export default Landing;
