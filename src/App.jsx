import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {  QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ErrorElement } from './components';
import { Error, HomeLayout, Landing, NewContact, EditContact } from './pages';

// loaders
import { loader as landingLoader } from './pages/Landing';
import { loader as editLoader } from './pages/EditContact';
import { queryClient } from './utils';

//actions
// import { action as newContactAction } from './pages/NewContact';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        id: 'contacts',
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },
      {
        path: 'contacts/new',
        element: <NewContact />,
        errorElement: <ErrorElement />,
        // action: newContactAction,
      },
      {
        path: 'contacts/edit/:contactId',
        element: <EditContact />,
        errorElement: <ErrorElement />,
        id: 'edit-contact',
        loader: editLoader(queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
