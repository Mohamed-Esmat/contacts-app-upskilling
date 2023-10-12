import AddContact from '../components/AddContact';
import { customFetch } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export const action = async ({ request }) => {
//   const url = '/create';
//   const data = await request.formData();

//   const picture = data.get('image');
//   const firstName = data.get('firstName');
//   const lastName = data.get('lastName');
//   const email = data.get('email');
//   const phone = data.get('phone');

//   const formData = { picture, firstName, lastName, email, phone };
//   /** */
//   if (
//     formData.firstName.trim() === '' ||
//     formData.lastName.trim() === '' ||
//     formData.phone.length < 7 ||
//     !formData.email.trim().includes('@')
//   ) {
//     toast.error('Please Enter a valid data!', {
//       position: 'top-center',
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'colored',
//     });
//     return;
//     // Send the formData to the server
//   } else {
//     const response = await customFetch.post(url, formData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'app-id': '64fc4a747b1786417e354f31',
//       },
//     });
//     console.log('addRequest', response);

//     toast('Successfully added the Contact.', {
//       position: 'top-center',
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'light',
//     });
//     // navigate('/');
//   }
//   /** */
// };

const NewContact = () => {
  return (
    <>
      <AddContact />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default NewContact;
