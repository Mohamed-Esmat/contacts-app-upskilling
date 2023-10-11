import { useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import classes from './AddContact.module.css';
import defaultImage from '../assets/user-profile-pic.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customFetch } from '../utils';
import SubmitBtn from './SubmitBtn';

const AddContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    picture: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevSnap) => {
      return { ...prevSnap, [name]: value };
    });
  };

  const handleImageUpload = (e) => {
    if (e.target.files.length !== 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setFormData((prevSnap) => {
        return { ...prevSnap, picture: file };
      });
    }
  };

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    document.getElementById('image-upload').click();
  };

  const handleSave = () => {
    const url = '/create';
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.phone.length < 7 ||
      !formData.email.trim().includes('@')
    ) {
      toast.error('Please Enter a valid data!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
      // Send the formData to the server
    } else {
      const addContact = async () => {
        const response = await customFetch.post(url, formData, {
          headers: {
            'Content-Type': 'application/json',
            'app-id': '64fc4a747b1786417e354f31',
          },
        });
        console.log('addRequest', response);
      };
      addContact();
      // toast('Successfully added the Contact.', {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   });
      navigate('/');
    }
  };

  return (
    <div className={classes['contact-form']}>
      <Form method="POST" className={classes['contact-form__form']}>
        {/* FORM IMAGE */}
        <div className={classes['contact-form__image']}>
          <input
            name="image"
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className={classes['contact-form__input--hidden']}
          />
          <label
            htmlFor="image-upload"
            className={classes['contact-form__image-label']}
            onClick={handleImageClick}
          >
            <img
              src={formData.picture || defaultImage}
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
            type="phone"
            id="phone"
            name="phone"
            maxLength="15"
            value={formData.phone}
            onChange={handleChange}
            className={classes['contact-form__input']}
          />
          <input
            placeholder="Email"
            type="email"
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
          <SubmitBtn
            text="Save"
            handleAction={handleSave}
            styles={`${classes['contact-form__button']} ${classes['contact-form__button--save']}`}
          />
          {/* <button
            type="submit"
            onClick={handleSave}
            className={`${classes['contact-form__button']} ${classes['contact-form__button--save']}`}
          >
            Save
          </button> */}
        </div>
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
      </Form>
    </div>
  );
};

export default AddContact;
