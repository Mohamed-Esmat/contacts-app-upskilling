import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ErrorElement } from './components';
import { Error, HomeLayout, Landing, NewContact, EditContact } from './pages';

// loaders
import { loader as landingLoader } from './pages/Landing';
import { loader as editLoader } from './pages/EditContact';

//actions
import { action as newContactAction } from './pages/NewContact';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        // loader: landingLoader(queryClient),
        loader: landingLoader,
      },
      {
        path: 'contacts/new',
        element: <NewContact />,
        errorElement: <ErrorElement />,
        action: newContactAction,
        // loader: productsLoader(queryClient),
      },
      {
        path: 'contacts/edit/:contactId',
        element: <EditContact />,
        errorElement: <ErrorElement />,
        // loader: productsLoader(queryClient),
        id: 'edit-contact',
        loader: editLoader,
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
