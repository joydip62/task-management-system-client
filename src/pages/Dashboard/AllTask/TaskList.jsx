import { useDrop } from "react-dnd";
import Task from "./Task";

const TaskList = ({ title, tasks, onTaskDrop, onEdit, onDelete }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: onTaskDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: "2px dashed #000",
        padding: "16px",
        marginRight: "16px",
      }}
    >
      <h3>{title}</h3>
      <div style={{ opacity: isOver ? 0.5 : 1 }}>
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
