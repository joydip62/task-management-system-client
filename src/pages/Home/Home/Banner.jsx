import { Link } from "react-router-dom";

const Banner = () => {
    return (
      <div className="mx-auto relative p-10">
        <img
          className="text-center mx-auto"
          src="https://i.ibb.co/VDC7R9f/task-management-concept-banner-header-vector-24529047.jpg"
          alt=""
        />
        <Link to="/dashboard" className="btn btn-sm md:btn-lg btn-secondary absolute left-64 top-2/3 md:left-2/3">
          Let’s Explore
        </Link>
      </div>
    );
};

export default Banner;