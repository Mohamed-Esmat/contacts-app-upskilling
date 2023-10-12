import { useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import defaultImage from '../assets/user-profile-pic.png';
import classes from './UpdateContact.module.css';
import { customFetch } from '../utils';
import SubmitBtn from './SubmitBtn';
import { ToastContainer, toast } from 'react-toastify';
import useUpdatedInput from '../hooks/use-update-input';

const UpdateContact = () => {
  const { contact } = useRouteLoaderData('edit-contact');
  const originalData = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    phone: contact.phone,
    email: contact.email,
    picture: contact.picture,
  };

  const [enteredFirstName, setEnteredFirstName] = useState(
    originalData.firstName
  );
  const [firstNameInputIsTouched, setFirstNameInputIsTouched] = useState(false);

  const enteredFirstNameIsValid = enteredFirstName.trim() !== '';
  const firstNameInputHasError =
    !enteredFirstNameIsValid && firstNameInputIsTouched;

  const firstNameChangeHandler = (event) => {
    // dispatch({ type: 'INPUT', value: event.target.value });
    setEnteredFirstName(event.target.value);
  };

  const firstNameBlurHandler = () => {
    // dispatch({ type: 'BLUR' });
    setFirstNameInputIsTouched(true);
  };

  //lastName
  const [enteredLastName, setEnteredLastName] = useState(
    originalData.lastName
  );
  const [lastNameInputIsTouched, setLastNameInputIsTouched] = useState(false);

  const enteredLastNameIsValid = enteredLastName.trim() !== '';
  const lastNameInputHasError =
    !enteredLastNameIsValid && lastNameInputIsTouched;

  const lastNameChangeHandler = (event) => {
    setEnteredLastName(event.target.value);
  };
  const lastNameBlurHandler = () => {
    setLastNameInputIsTouched(true);
  };

  //phone
  const [enteredPhone, setEnteredPhone] = useState(
    originalData.phone
  );
  const [phoneInputIsTouched, setPhoneInputIsTouched] = useState(false);

  const enteredPhoneIsValid = enteredPhone.trim().length > 3;
  const phoneInputHasError =
    !enteredPhoneIsValid && phoneInputIsTouched;

  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };
  const phoneBlurHandler = () => {
    setPhoneInputIsTouched(true);
  };

  //email
  const [enteredEmail, setEnteredEmail] = useState(
    originalData.email
  );
  const [emailInputIsTouched, setEmailInputIsTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.trim().length > 3;
  const emailInputHasError =
    !enteredEmailIsValid && emailInputIsTouched;

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const emailBlurHandler = () => {
    setEmailInputIsTouched(true);
  };

  //picture
  const [enteredPicture, setEnteredPicture] = useState(
    contact.picture || defaultImage
  );
  const [isSubmitting, setIsSubmitting] = useState(false);



  // const {
  //   value: enteredFirstName,
  //   isValid: enteredFirstNameIsValid,
  //   hasError: firstNameInputHasError,
  //   valueChangeHandler: firstNameChangeHandler,
  //   inputBlurHandler: firstNameBlurHandler,
  // } = useUpdatedInput(originalData.firstName, (value) => value.trim() !== '');

  // const {
  //   value: enteredLastName,
  //   isValid: enteredLastNameIsValid,
  //   hasError: lastNameInputHasError,
  //   valueChangeHandler: lastNameChangeHandler,
  //   inputBlurHandler: lastNameBlurHandler,
  // } = useUpdatedInput(originalData.lastName, (value) => value.trim() !== '');

  // const {
  //   value: enteredPhone,
  //   isValid: enteredPhoneIsValid,
  //   hasError: phoneInputHasError,
  //   valueChangeHandler: phoneChangeHandler,
  //   inputBlurHandler: phoneBlurHandler,
  // } = useUpdatedInput(originalData.phone, (value) => value.trim().length > 3);

  // const {
  //   value: enteredEmail,
  //   isValid: enteredEmailIsValid,
  //   hasError: emailInputHasError,
  //   valueChangeHandler: emailChangeHandler,
  //   inputBlurHandler: emailBlurHandler,
  //   // reset: emailReset,
  // } = useUpdatedInput(
  //   originalData.email,
  //   (value) => value.trim() === originalData.email
  // );

  const handleImageUpdate = (e) => {
    if (e.target.files.length !== 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setEnteredPicture(file);
    }
  };

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    document.getElementById('image-update').click();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      console.log((enteredFirstName) => {
        return enteredFirstName.trim() !== '';
      });
      if (
        !enteredFirstNameIsValid ||
        !enteredLastNameIsValid ||
        !enteredPhoneIsValid ||
        !enteredEmailIsValid ||
        !enteredPicture
      ) {
        firstNameBlurHandler();
        lastNameBlurHandler();
        phoneBlurHandler();
        emailBlurHandler();
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
      } else if (enteredEmail !== originalData.email) {
        toast.error("Please don't change the email!", {
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
        // Compare the formData with the originalData to find the updated fields
        setIsSubmitting(true);
        const formData = {
          firstName: enteredFirstName,
          lastName: enteredLastName,
          phone: enteredPhone,
          // email: enteredEmail,
          picture: enteredPicture,
        };
        const updatedFields = {};
        for (const key in formData) {
          //check if the email is different from the original
          if (formData[key] !== originalData[key]) {
            updatedFields[key] = formData[key];
          }
        }
        if (Object.keys(updatedFields).length === 0) {
          console.log(updatedFields);
          setIsSubmitting(false);
          toast.error(`Please change any value ot update`, {
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
        }

        for (const key in updatedFields) {
          if (key === 'email') {
            toast.error("Please don't update the email.", {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            return;
          }
        }
        console.log('updatedFields', updatedFields);
        // Send only the updated fields and the updated image to the server
        const response = await customFetch.put(
          contact.id,
          { firstName: 'mohamed10101' },
          {
            headers: {
              'Content-Type': 'application/json',
              'app-id': '652808477418632024e30e89',
            },
          }
        );
        if (response.status >= 200 && response.status < 300) {
          setIsSubmitting(false);
          toast.success('Successfully updated the Contact.', {
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
    } catch (error) {
      setIsSubmitting(false);
      if (error.response.data.error === 'BODY_NOT_VALID') {
        toast.error('Something went wrong, Please try again later.', {
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
      }
      console.log(error.response);
      toast.error(error.response.data.data.data, {
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
      <form method="PUT" className={classes['contact-form__form']}>
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
              src={enteredPicture || defaultImage}
              alt="contact image"
              className={classes['']}
              onClick={handleImageClick}
            />
            <span>Upload an Image</span>
          </label>
        </div>

        <div className={classes['contact-form__field']}>
          <div className="flex flex-col">
            <input
              placeholder="First Name"
              type="text"
              id="firstName"
              name="firstName"
              value={enteredFirstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              className={`${classes['contact-form__input']} ${
                firstNameInputHasError && classes['invalid']
              } `}
            />
            {firstNameInputHasError && (
              <p className="text-red-600">First name can't be empty!</p>
            )}
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              value={enteredLastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              className={`${classes['contact-form__input']} ${
                lastNameInputHasError && classes['invalid']
              } `}
            />
            {lastNameInputHasError && (
              <p className="text-red-600">Last name can't be empty!</p>
            )}
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Phone Number"
              type="text"
              id="phone"
              name="phone"
              value={enteredPhone}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
              className={`${classes['contact-form__input']} ${
                phoneInputHasError && classes['invalid']
              } `}
            />
            {phoneInputHasError && (
              <p className="text-red-600">
                Phone need to be more than 3 numbers.
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              disabled
              value={enteredEmail}
              onChange={emailChangeHandler}
              // onBlur={emailBlurHandler}
              className={`${classes['contact-form__input']} ${
                originalData.email !== enteredEmail && classes['invalid']
              } `}
            />
            {originalData.email !== enteredEmail && (
              <p className="text-red-600">Email can't be updated!</p>
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
    </div>
  );
};

export default UpdateContact;
