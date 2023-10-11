import { useState } from 'react';
import {
  // Form,
  Link,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { customFetch, queryClient } from '../utils';
import SubmitBtn from './SubmitBtn';
import classes from './UpdateContact.module.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const UpdateContact = () => {
  const { contact } = useRouteLoaderData('edit-contact');
  const requestUrl = useSelector((state) => state.request);

  console.log(requestUrl);

  const navigate = useNavigate();

  const originalData = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    phone: contact.phone,
    email: contact.email,
    picture: contact.picture,
  };

  // const initialFormDate = { ...originalData };
  const [formData, setFormData] = useState({ ...originalData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevSnap) => {
      return { ...prevSnap, [name]: value };
    });
  };

  const handleImageUpdate = (e) => {
    if (e.target.files.length !== 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setFormData((prevSnap) => {
        return { ...prevSnap, picture: file };
      });
    }
  };

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    document.getElementById('image-update').click();
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ updatedFields }) =>
      customFetch.put(contact.id, updatedFields, {
        headers: {
          'Content-Type': 'application/json',
          'app-id': '64fc4a747b1786417e354f31',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contacts-cache', requestUrl],
        exact: true,
        // refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['edit-contact-cache', contact.id],
        exact: true,
        // refetchType: 'none',
      });
      navigate('/');

      toast('Successfully updated the Contact.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    },
    onMutate: async (data) => {
      const updatedFields = data.updatedFields;

      await queryClient.cancelQueries({
        queryKey: ['edit-contact-cache', { id: contact.id }],
      });
      //rolling back the cached contact is the update failed
      const previousContact = queryClient.getQueryData([
        'edit-contact-cache',
        { id: contact.id },
      ]);

      queryClient.setQueryData(['edit-contact-cache', { id: contact.id }], {
        ...originalData,
        ...updatedFields,
      });

      return { previousContact };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(
        ['edit-contact-cache', { id: contact.id }],
        context.previousContact
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['edit-contact-cache', { id: contact.id }]);
    },
  });

  const handleUpdate = () => {
    // Compare the formData with the originalData to find the updated fields
    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== originalData[key]) {
        updatedFields[key] = formData[key];
      }
    }

    // Send only the updated fields and the updated image to the server
    mutate({ id: contact.id, updatedFields });

    navigate('..');
  };

  return (
    <div className={classes['contact-form']}>
      <form className={classes['contact-form__form']}>
        {/* FORM IMAGE */}
        <div className={classes['contact-form__image']}>
          <input
            type="file"
            id="image-update"
            accept="image/*"
            onChange={handleImageUpdate}
            className={classes['contact-form__input--hidden']}
          />
          <label
            htmlFor="image-update"
            className={classes['contact-form__image-label']}
            onClick={handleImageClick}
          >
            <img
              src={formData.picture}
              alt="contact image"
              className={classes['']}
              onClick={handleImageClick}
            />
            <span>Upload an Image</span>
          </label>
        </div>

        <div className={classes['contact-form__field']}>
          <input
            placeholder="First Name"
            type="text"
            id="firstName"
            name="firstName"
            maxLength="50"
            value={formData.firstName}
            onChange={handleChange}
            className={classes['contact-form__input']}
          />
          <input
            placeholder="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            maxLength="50"
            value={formData.lastName}
            onChange={handleChange}
            className={classes['contact-form__input']}
          />
          <input
            placeholder="Phone Number"
            type="text"
            id="phone"
            name="phone"
            maxLength="15"
            value={formData.phone}
            onChange={handleChange}
            className={classes['contact-form__input']}
          />
          <input
            placeholder="Email"
            type="text"
            id="email"
            name="email"
            maxLength="50"
            value={formData.email}
            onChange={handleChange}
            className={classes['contact-form__input']}
          />
        </div>
        <div className={classes['contact-form__buttons']}>
          <Link
            to="/"
            className={`${classes['contact-form__button']} ${classes['contact-form__button--cancel']}`}
          >
            Cancel
          </Link>
          {isLoading ? (
            <SubmitBtn
              text="Submitting..."
              handleAction={handleUpdate}
              styles={`${classes['contact-form__button']} ${classes['contact-form__button--save']}`}
            />
          ) : (
            <SubmitBtn
              text="Update"
              handleAction={handleUpdate}
              styles={`${classes['contact-form__button']} ${classes['contact-form__button--save']}`}
            />
          )}
          {/* <button
            type="submit"
            onClick={handleUpdate}
            className={`${classes['contact-form__button']} ${classes['contact-form__button--save']}`}
          >
            {isContactSubmitting ? 'submitting...' : 'Update'}
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default UpdateContact;
