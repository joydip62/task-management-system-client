import { Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#EAF4FC";
}

const Task = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={`${task._id}`} key={task._id} index={index}>
      {(provided, snapshot) => (
        <Container
          className="border-black border-2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="text-center">
            <p>Title : {task.title}</p>
            <p>Description : {task.description}</p>
            <p>Deadlines : {task.deadlines}</p>
            <p>Priority : {task.priority}</p>
            <p>Status : {task.status}</p>
          </div>
          <div className="text-center mt-5">
            <button
              className="btn btn-sm btn-error mr-5"
              onClick={() => onDelete(task._id)}
            >
              <FaTrash />
            </button>

            <Link to={`/dashboard/taskEdit/${task._id}`}>
              <button className="btn btn-info btn-sm">
                <FaEdit />
              </button>
            </Link>
          </div>

          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
