import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TaskList from "./TaskList";

const TaskManager = () => {
  const [todo, setTodo] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [ongoing, setOngoing] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: task = [], refetch } = useQuery({
      queryKey: ["task"],
      queryFn: async () => {
        try {
          const res = await axiosSecure.get("/task");
          if (res.data) {
            const userEmail = user?.email;
            const filteredData = res.data.filter(
              (item) => item.email === userEmail
            );
            // Update todo, completed, and ongoing based on the filtered tasks
            setTodo(filteredData.filter((task) => task.status === "todo"));
            setCompleted(
              filteredData.filter((task) => task.status === "completed")
            );
            setOngoing(
              filteredData.filter((task) => task.status === "ongoing")
            );

            return filteredData;
          }
          return task;
        } catch (error) {
          console.error("Error fetching user data:", error);
          return task;
        }
      },
    });

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }
    const task = findItemById(draggableId, [...todo, ...ongoing, ...completed]);

    let updatedSourceList;
    switch (source.droppableId) {
      case "1":
        updatedSourceList = removeItemById(draggableId, todo);
        setTodo(updatedSourceList);
        break;
      case "2":
        updatedSourceList = removeItemById(draggableId, ongoing);
        setOngoing(updatedSourceList);
        break;
      case "3":
        updatedSourceList = removeItemById(draggableId, completed);
        setCompleted(updatedSourceList);
        break;
      default:
        break;
    }
    switch (destination.droppableId) {
      case "1":
        setTodo([...todo, { ...task, status: "todo" }]);
        break;
      case "2":
        setOngoing([...ongoing, { ...task, status: "ongoing" }]);
        break;
      case "3":
        setCompleted([...completed, { ...task, status: "completed" }]);
        break;
      default:
        break;
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item._id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item._id != id);
  }

    



    const handleDelete = (taskId) => {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/task/${taskId}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "The task has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
    };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 className="text-3xl font-bold text-center">TASK PROGRESS</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TaskList
          title={"TO DO"}
          tasks={todo}
          id={"1"}
          onDelete={handleDelete}
        />
        <TaskList
          title={"ONGOING"}
          tasks={ongoing}
          id={"2"}
          onDelete={handleDelete}
        />
        <TaskList
          title={"COMPLETED"}
          tasks={completed}
          id={"3"}
          onDelete={handleDelete}
        />
      </div>
    </DragDropContext>
  );
};

export default TaskManager;
