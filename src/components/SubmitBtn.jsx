import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({ text, handleAction, styles }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button
      type="submit"
      className={styles}
      disabled={isSubmitting}
      onClick={(e) =>handleAction(e)}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        text || 'submit'
      )}
    </button>
  );
};

export default SubmitBtn;
