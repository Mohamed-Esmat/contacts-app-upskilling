import { Outlet, useNavigation } from 'react-router-dom';
import { Loading } from '../components';
import classes from './HomeLayout.module.css';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <>
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className={`${classes['bg-image']} grid place-items-center h-screen`}>
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
