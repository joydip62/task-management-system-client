
import { Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";

const Task = ({ task, onEdit, onDelete, index, draggableId }) => {
  console.log(draggableId);
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
                  className="btn btn-sm btn-error mr-5"
                  onClick={() => onDelete(task._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
