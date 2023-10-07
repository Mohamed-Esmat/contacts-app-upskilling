import { useState } from 'react';
import {
  Form,
  Link,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from 'react-router-dom';
import classes from './UpdateContact.module.css';
import { customFetch } from '../utils';
import SubmitBtn from './SubmitBtn';

const UpdateContact = () => {
  const { contact } = useRouteLoaderData('edit-contact');

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isContactSubmitting = navigation.state === 'submitting';

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

  const handleUpdate = () => {
    // Compare the formData with the originalData to find the updated fields
    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== originalData[key]) {
        updatedFields[key] = formData[key];
      }
    }

    // Send only the updated fields and the updated image to the server
    const updateContact = async () => {
      await customFetch.put(contact.id, updatedFields, {
        headers: {
          'app-id': '64fc4a747b1786417e354f31',
        },
      });
    };
    updateContact();

    navigate('..');
  };

  return (
    <div className={classes['contact-form']}>
      <Form className={classes['contact-form__form']}>
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
            value={formData.firstName}
            onChange={handleChange}
            className={classes['contact-form__input']}
          />
          <input
            placeholder="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={classes['contact-form__input']}
          />
          <input
            placeholder="Phone Number"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={classes['contact-form__input']}
          />
          <input
            placeholder="Email"
            type="text"
            id="email"
            name="email"
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
          <SubmitBtn
            text="Update"
            handleAction={handleUpdate}
            styles={`${classes['contact-form__button']} ${classes['contact-form__button--save']}`}
          />
          {/* <button
            type="submit"
            onClick={handleUpdate}
            className={`${classes['contact-form__button']} ${classes['contact-form__button--save']}`}
          >
            {isContactSubmitting ? 'submitting...' : 'Update'}
          </button> */}
        </div>
      </Form>
    </div>
  );
};

export default UpdateContact;
