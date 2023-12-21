import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {

  const { user } = useAuth();
  return (
    <div>
      <div>
          <div className="card card-side bg-base-100 shadow-xl">
            <figure>
              <img
                src={user?.photoURL}
                alt="Movie"
                className="w-40"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Name: {user?.displayName}</h2>
              <h2 className="card-title">Email : {user?.email}</h2>
            </div>
          </div>
      </div>
    </div>
  );
};

export default DashboardHome;