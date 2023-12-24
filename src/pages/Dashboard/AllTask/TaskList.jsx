import styled from "styled-components";
import Task from "./Task";
import "./scroll.css";
import { Droppable } from "react-beautiful-dnd";

const TaskList = ({ title, tasks, id, onDelete }) => {
  const Container = styled.div`
    background-color: #f4f5f7;
    border-radius: 2.5px;
    width: 300px;
    height: 475px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: 1px solid gray;
  `;

  const TaskListContainer = styled.div`
    padding: 3px;
    transistion: background-color 0.2s ease;
    background-color: #f4f5f7;
    flex-grow: 1;
    min-height: 100px;
  `;
  return (
    <Container className="column">
      <div className="bg-gray-300 font-bold p-2 text-center">{title}</div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskListContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={index} index={index} task={task} onDelete={onDelete} />
            ))}
            {provided.placeholder}
          </TaskListContainer>
        )}
      </Droppable>
    </Container>
  );
};

export default TaskList;
