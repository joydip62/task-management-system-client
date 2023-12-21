import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const TaskList = ({
  title,
  tasks,
  onEdit,
  onDelete,
}) => {
  return (
    <Droppable droppableId={title.toUpperCase()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            border: "2px dashed #000",
            padding: "16px",
            marginRight: "16px",
          }}
        >
          <h3>{title}</h3>
          {tasks.map((task, index) => (
            <Task
              draggableId={title}
              key={task._id}
              task={task}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
