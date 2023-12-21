import { FaEdit, FaTrash } from "react-icons/fa";

const Task = ({ task, onEdit, onDelete }) => {
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl mb-5">
        <div className="card-body">
          <h2 className="card-title">{task?.title}</h2>
          <p>{task?.description}</p>
          <p>Status: {task?.status}</p>
          <div className="card-actions justify-start">
            <div className="badge badge-outline">
              Deadline : {task?.deadlines}
            </div>
            <div className="badge badge-outline">
              Priority : {task?.priority}
            </div>
          </div>
          <div>
            <button
              className="btn btn-sm btn-primary mr-5"
              onClick={() => onEdit(task)}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-sm btn-error mr-5"
              onClick={() => onDelete(task._id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;