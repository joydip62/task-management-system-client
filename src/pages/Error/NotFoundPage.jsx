import { Link } from 'react-router-dom';
import errorImg from './../../../public/404.png'
const NotFoundPage = () => {
    return (
      <div className="mx-auto w-full md:flex md:justify-evenly md:items-center h-[600px]">
        <img src={errorImg} alt="error img" className="text-center mx-auto" />
        <div className="space-y-3 mx-auto text-center md:text-left">
          <h2 className="text-[96px] font-extrabold">404</h2>
          <p className="text-5xl font-bold">Sorry</p>
          <p className="font-semibold">
            The Page You Are Looking For Can Not Be Found!
          </p>
          <br />
          <Link to={-1}>
            <button className="bg-green-600 px-7 py-3 font-semibold text-2xl rounded-2xl">
              Back
            </button>
          </Link>
        </div>
      </div>
    );
};

export default NotFoundPage;