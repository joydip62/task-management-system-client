import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TaskList from "./TaskList";

const TaskManager = () => {
    const [tasks, setTasks] = useState({
      todo: [],
      ongoing: [],
      completed: [],
    });
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
          setTasks({
            todo: filteredData.filter((task) => task.status === "todo"),
            ongoing: filteredData.filter((task) => task.status === "ongoing"),
            completed: filteredData.filter(
              (task) => task.status === "completed"
            ),
          });
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

    const task = tasks[source.droppableId].find((t) => t._id === draggableId);

    const updatedSourceList = tasks[source.droppableId].filter(
      (t) => t._id !== draggableId
    );
    const updatedDestinationList = [
      ...tasks[destination.droppableId],
      { ...task, status: destination.droppableId },
    ];

    setTasks({
      ...tasks,
      [source.droppableId]: updatedSourceList,
      [destination.droppableId]: updatedDestinationList,
    });
  };

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
      <h2 className="text-3xl font-bold text-center mb-5">TASK PROGRESS</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TaskList
          title="TO DO"
          tasks={tasks.todo}
          id="todo"
          onDelete={handleDelete}
        />
        <TaskList
          title="ONGOING"
          tasks={tasks.ongoing}
          id="ongoing"
          onDelete={handleDelete}
        />
        <TaskList
          title="COMPLETED"
          tasks={tasks.completed}
          id="completed"
          onDelete={handleDelete}
        />
      </div>
    </DragDropContext>
  );
};

export default TaskManager;
