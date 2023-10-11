import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';
import classes from './PaginationContainer.module.css';

const PaginationContainer = () => {
  const { meta } = useRouteLoaderData('contacts');
  // console.log('pagination', meta);
  const { limit, page, total } = meta;
  const pageCount = Math.ceil(total / limit);
  // console.log(pageCount);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(search);
  // if (+searchParams.get('page') > pageCount) {
  //   // searchParams.set('page', 0);
  //   // navigate(`${pathname}?${searchParams.toString()}`);
  //   navigate(`${pathname}`);
  // }


  const handlePageChange = (pageNumber) => {
    if (pageNumber === 0) {
      navigate(`${pathname}`);
    } else {
      searchParams.set('page', pageNumber);
      navigate(`${pathname}?${searchParams.toString()}`);
    }
  };

  return (
    <div className={classes['pagination__container']}>
      <button
        className={classes['pagination__container-prev']}
        onClick={() => {
          let prevPage = page - 1;
          if (prevPage < 0) prevPage = pageCount - 1;
          handlePageChange(prevPage);
          // console.log(prevPage);
          // console.log(page);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
        >
          <path
            d="M0.34314 9.8324L9.83288 0.34314C10.2904 -0.11438 11.0326 -0.11438 11.4901 0.34314L12.597 1.45007C13.0541 1.9071 13.0546 2.64734 12.599 3.10535L5.078 10.661L12.5985 18.2172C13.0546 18.6752 13.0536 19.4154 12.5966 19.8724L11.4896 20.9794C11.0321 21.4369 10.2899 21.4369 9.8324 20.9794L0.34314 11.4896C-0.11438 11.0321 -0.11438 10.2899 0.34314 9.8324Z"
            fill="white"
          />
        </svg>
      </button>
      <div className={classes['pagination__container-page-info']}>
        {page + 1}/{pageCount}
      </div>
      <button
        className={classes['pagination__container-next']}
        onClick={() => {
          let nextPage = page + 1;
          if (nextPage >= pageCount) nextPage = 0;
          handlePageChange(nextPage);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
        >
          <path
            d="M12.5968 11.4899L3.1073 20.9793C2.64963 21.437 1.90764 21.437 1.45003 20.9793L0.343238 19.8725C-0.113647 19.4157 -0.114525 18.6752 0.341285 18.2172L7.86184 10.6613L0.341285 3.10536C-0.114525 2.6474 -0.113647 1.90692 0.343238 1.45004L1.45003 0.343249C1.90769 -0.114417 2.64968 -0.114417 3.1073 0.343249L12.5967 9.83265C13.0544 10.2903 13.0544 11.0323 12.5968 11.4899Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default PaginationContainer;
