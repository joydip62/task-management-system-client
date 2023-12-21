

const AllTask = ({ task }) => {
  return (
    <div
      style={{ border: "1px solid #000", padding: "8px", marginBottom: "8px" }}
    >
      <h3>{task?.title}</h3>
      <p>Description: {task?.description}</p>
      <p>Deadline: {task?.deadlines}</p>
      <p>Priority: {task?.priority}</p>
      <p>User: {task?.user}</p>
      <p>Email: {task?.email}</p>
    </div>
  );
};

export default AllTask;
