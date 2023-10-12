import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './AddContact.module.css';
import defaultImage from '../assets/user-profile-pic.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customFetch } from '../utils';
import SubmitBtn from './SubmitBtn';
import useAddInput from '../hooks/use-add-input';

const AddContact = () => {
  const [enteredPicture, setEnteredPicture] = useState(defaultImage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useAddInput((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useAddInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useAddInput((value) => value.includes('@'));

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: phoneReset,
  } = useAddInput((value) => value.trim().length > 9);

  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   email: '',
  //   picture: defaultImage,
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevSnap) => {
  //     return { ...prevSnap, [name]: value };
  //   });
  // };

  const handleImageUpload = (e) => {
    if (e.target.files.length !== 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      // setFormData((prevSnap) => {
      //   return { ...prevSnap, picture: file };
      // });
      setEnteredPicture(file);
    }
  };

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    document.getElementById('image-upload').click();
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const url = '/create';
    try {
      if (
        !enteredFirstNameIsValid ||
        !enteredLastNameIsValid ||
        !enteredPhoneIsValid ||
        !enteredEmailIsValid ||
        !enteredPicture
      ) {
        firstNameBlurHandler()
        lastNameBlurHandler()
        phoneBlurHandler()
        emailBlurHandler()
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
      } else {
        // Send the formData to the server
        setIsSubmitting(true);
        const formData = {
          firstName: enteredFirstName,
          lastName: enteredLastName,
          phone: enteredPhone,
          email: enteredEmail,
          picture: enteredPicture,
        };

        const response = await customFetch.post(url, formData, {
          headers: {
            'Content-Type': 'application/json',
            'app-id': '652808477418632024e30e89',
          },
        });
        if (response.status >= 200 && response.status < 300) {
          setIsSubmitting(false);
          // setFormData({
          //   firstName: '',
          //   lastName: '',
          //   phone: '',
          //   email: '',
          //   picture: defaultImage,
          // });
          firstNameReset();
          lastNameReset();
          phoneReset();
          emailReset();
          setEnteredPicture(defaultImage);
          toast.success('Successfully added the Contact.', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      }

      // setFormData();
    } catch (error) {
      setIsSubmitting(false);
      console.log(error.response.data.data.email);
      toast.error(error.response.data.data.email, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <div className={classes['contact-form']}>
      <form method="POST" className={classes['contact-form__form']}>
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
              src={enteredPicture || defaultImage}
              alt="contact image"
              className={classes['']}
              onClick={handleImageClick}
            />
            <span>Upload an Image</span>
          </label>
        </div>

        <div className={`${classes['contact-form__field']}`}>
          <div className="flex flex-col">
            <input
              placeholder="First Name"
              type="text"
              id="firstName"
              name="firstName"
              // value={formData.firstName}
              value={enteredFirstName}
              // onChange={handleChange}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              className={`${classes['contact-form__input']} ${
                firstNameInputHasError && classes['invalid']
              } `}
            />
            {firstNameInputHasError && (
              <p className="text-red-600">
                First name can't be empty!
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <input
            placeholder="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            // value={formData.lastName}
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            className={`${classes['contact-form__input']} ${
              lastNameInputHasError && classes['invalid']
            } `}
            />
            {lastNameInputHasError && (
              <p className="text-red-600">
                Last name can't be empty!
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <input
            placeholder="Phone Number"
            type="phone"
            id="phone"
            name="phone"
            // value={formData.phone}
            value={enteredPhone}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
            className={`${classes['contact-form__input']} ${
              phoneInputHasError && classes['invalid']
            } `}
            />
            {phoneInputHasError && (
              <p className="text-red-600">
                Phone need to be more than 9 numbers.
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            // value={formData.email}
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            className={`${classes['contact-form__input']} ${
              emailInputHasError && classes['invalid']
            } `}
            />
            {emailInputHasError && (
              <p className="text-red-600">
                Email have to include '@'!
              </p>
            )}
          </div>
          
        </div>
        <div className={classes['contact-form__buttons']}>
          <Link
            to="/"
            className={`${classes['contact-form__button']} ${classes['contact-form__button--cancel']}`}
          >
            Cancel
          </Link>
          {isSubmitting ? (
            <SubmitBtn
              text="Submitting..."
              handleAction={handleSave}
              styles={`${classes['contact-form__button']} ${classes['contact-form__button--save']}`}
            />
          ) : (
            <SubmitBtn
              text="Save"
              handleAction={handleSave}
              styles={`${classes['contact-form__button']} ${classes['contact-form__button--save']}`}
            />
          )}

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
      </form>
    </div>
  );
};

export default AddContact;
