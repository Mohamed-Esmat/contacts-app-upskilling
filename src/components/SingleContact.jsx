import { useMutation } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { customFetch, queryClient } from '../utils';
import Modal from './Modal';
import modalStyles from './Modal.module.css';
import classes from './SingleContact.module.css';
import { ToastContainer, toast } from 'react-toastify';

const SingleContact = ({ id, firstName, lastName, picture, phone }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  // console.log('search', search);
  // console.log('pathname', pathname);
  /****/
  // mutate event

  const { mutate, isPending: isPendingDeletion } = useMutation({
    mutationFn: () =>
      customFetch.delete(id, {
        headers: {
          'Content-Type': 'application/json',
          'app-id': '64fc4a747b1786417e354f31',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['delete-contact'],
        refetchType: 'none',
      });
      toast.success('Successfully deleted the Contact.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setIsDeleting(false);
      setTimeout(() => {
        navigate(`${pathname}${search}`);
      }, 5000);
    },
    onError: () => {
      setIsDeleting(false)
      toast.error("Something went wrong we couldn't  delete the Contact.", {
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
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  async function handleDelete() {
    mutate({ id });
  }
  /****/

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <div className={modalStyles['modal__figure']}>
            <span className={modalStyles['modal__figure-icon']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M50 0C22.3877 0 0 22.3958 0 50C0 77.6204 22.3877 100 50 100C77.6123 100 100 77.6204 100 50C100 22.3958 77.6123 0 50 0ZM50 22.1774C54.6766 22.1774 58.4677 25.9685 58.4677 30.6452C58.4677 35.3218 54.6766 39.1129 50 39.1129C45.3234 39.1129 41.5323 35.3218 41.5323 30.6452C41.5323 25.9685 45.3234 22.1774 50 22.1774ZM61.2903 73.3871C61.2903 74.7232 60.2071 75.8064 58.871 75.8064H41.129C39.7929 75.8064 38.7097 74.7232 38.7097 73.3871V68.5484C38.7097 67.2123 39.7929 66.129 41.129 66.129H43.5484V53.2258H41.129C39.7929 53.2258 38.7097 52.1425 38.7097 50.8065V45.9677C38.7097 44.6317 39.7929 43.5484 41.129 43.5484H54.0323C55.3683 43.5484 56.4516 44.6317 56.4516 45.9677V66.129H58.871C60.2071 66.129 61.2903 67.2123 61.2903 68.5484V73.3871Z"
                  fill="#EC1B1B"
                />
              </svg>
            </span>
            <p className={modalStyles['modal__figure-caption']}>
              Are you sure you need delete this user ?
            </p>
          </div>
          <div className={modalStyles['modal__actions']}>
            {isPendingDeletion && <p>Deleting please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button
                  onClick={handleStopDelete}
                  className={modalStyles['modal__actions-cancel']}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className={modalStyles['modal__actions-confirm']}
                >
                  Yes
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
      <div className={classes['single__contact']}>
        <div className={classes['single__contact-figure']}>
          <img
            src={picture}
            alt=""
            className={classes['single__contact-image']}
          />
          <div className={classes['single__contact-capture']}>
            <h4 className={classes['single__contact-name']}>
              {firstName} {lastName}
            </h4>
            <p className={classes['single__contact-number']}>
              {phone || '01122154483'}
            </p>
          </div>
        </div>
        <div className={classes['single__contact-action-buttons']}>
          <Link to={`contacts/edit/${id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="45"
              viewBox="0 0 54 45"
              fill="none"
            >
              <rect width="54" height="45" rx="5" fill="white" />
              <path
                d="M32.474 15.6068L36.3889 19.5217C36.5538 19.6866 36.5538 19.9557 36.3889 20.1207L26.9097 29.5998L22.8819 30.0469C22.3438 30.1076 21.888 29.6519 21.9488 29.1137L22.3958 25.0859L31.875 15.6068C32.0399 15.4418 32.309 15.4418 32.474 15.6068ZM39.5052 14.6128L37.3872 12.4948C36.7274 11.8351 35.6554 11.8351 34.9913 12.4948L33.4549 14.0312C33.2899 14.1962 33.2899 14.4653 33.4549 14.6302L37.3698 18.5451C37.5347 18.7101 37.8038 18.7101 37.9688 18.5451L39.5052 17.0087C40.1649 16.3446 40.1649 15.2726 39.5052 14.6128ZM31.6667 27.0217V31.4401H17.7778V17.5512H27.7517C27.8906 17.5512 28.0208 17.4948 28.1207 17.3993L29.8568 15.6632C30.1866 15.3333 29.9523 14.7734 29.4878 14.7734H17.0833C15.9332 14.7734 15 15.7066 15 16.8568V32.1345C15 33.2847 15.9332 34.2179 17.0833 34.2179H32.3611C33.5113 34.2179 34.4444 33.2847 34.4444 32.1345V25.2856C34.4444 24.8212 33.8845 24.5911 33.5547 24.9167L31.8186 26.6528C31.7231 26.7526 31.6667 26.8828 31.6667 27.0217Z"
                fill="#1BB0F0"
              />
            </svg>
          </Link>
          <button onClick={handleStartDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="45"
              viewBox="0 0 54 45"
              fill="none"
            >
              <rect width="54" height="45" rx="5" fill="white" />
              <path
                d="M17.5625 32.6563C17.5625 33.2779 17.8094 33.874 18.249 34.3135C18.6885 34.7531 19.2846 35 19.9062 35H33.9688C34.5904 35 35.1865 34.7531 35.626 34.3135C36.0656 33.874 36.3125 33.2779 36.3125 32.6563V16.25H17.5625V32.6563ZM30.8438 20.1563C30.8438 19.9491 30.9261 19.7503 31.0726 19.6038C31.2191 19.4573 31.4178 19.375 31.625 19.375C31.8322 19.375 32.0309 19.4573 32.1774 19.6038C32.3239 19.7503 32.4062 19.9491 32.4062 20.1563V31.0938C32.4062 31.301 32.3239 31.4997 32.1774 31.6462C32.0309 31.7927 31.8322 31.875 31.625 31.875C31.4178 31.875 31.2191 31.7927 31.0726 31.6462C30.9261 31.4997 30.8438 31.301 30.8438 31.0938V20.1563ZM26.1562 20.1563C26.1562 19.9491 26.2386 19.7503 26.3851 19.6038C26.5316 19.4573 26.7303 19.375 26.9375 19.375C27.1447 19.375 27.3434 19.4573 27.4899 19.6038C27.6364 19.7503 27.7188 19.9491 27.7188 20.1563V31.0938C27.7188 31.301 27.6364 31.4997 27.4899 31.6462C27.3434 31.7927 27.1447 31.875 26.9375 31.875C26.7303 31.875 26.5316 31.7927 26.3851 31.6462C26.2386 31.4997 26.1562 31.301 26.1562 31.0938V20.1563ZM21.4688 20.1563C21.4688 19.9491 21.5511 19.7503 21.6976 19.6038C21.8441 19.4573 22.0428 19.375 22.25 19.375C22.4572 19.375 22.6559 19.4573 22.8024 19.6038C22.9489 19.7503 23.0312 19.9491 23.0312 20.1563V31.0938C23.0312 31.301 22.9489 31.4997 22.8024 31.6462C22.6559 31.7927 22.4572 31.875 22.25 31.875C22.0428 31.875 21.8441 31.7927 21.6976 31.6462C21.5511 31.4997 21.4688 31.301 21.4688 31.0938V20.1563ZM37.0938 11.5625H31.2344L30.7754 10.6494C30.6782 10.4542 30.5284 10.29 30.3429 10.1753C30.1575 10.0606 29.9437 9.99985 29.7256 10H24.1445C23.9269 9.99917 23.7135 10.0596 23.5287 10.1745C23.3439 10.2894 23.1952 10.454 23.0996 10.6494L22.6406 11.5625H16.7812C16.574 11.5625 16.3753 11.6448 16.2288 11.7913C16.0823 11.9378 16 12.1366 16 12.3438V13.9063C16 14.1135 16.0823 14.3122 16.2288 14.4587C16.3753 14.6052 16.574 14.6875 16.7812 14.6875H37.0938C37.301 14.6875 37.4997 14.6052 37.6462 14.4587C37.7927 14.3122 37.875 14.1135 37.875 13.9063V12.3438C37.875 12.1366 37.7927 11.9378 37.6462 11.7913C37.4997 11.6448 37.301 11.5625 37.0938 11.5625Z"
                fill="#EC1B1B"
              />
            </svg>
          </button>
        </div>
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
    </>
  );
};

export default SingleContact;
