import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TaskList from "./TaskList";

const TaskManager = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

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
            setTasks(filteredData);
            return filteredData;
          }
          return task;
        } catch (error) {
          console.error("Error fetching user data:", error);
          return task;
        }
      },
    });

    const handleTaskDrop = async (item) => {
      try {
        const updatedTask = {
          ...item.task,
          status: getTitleFromType(item.type),
        };

        // Make an API call to update the task status
        await axiosSecure.patch(`/tasks/${updatedTask._id}`, updatedTask);

        // Update the local state to re-render the UI
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id
              ? { ...task, status: updatedTask.status }
              : task
          )
        );
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    };

    // edit task
    const handleEdit = (task) => {
      setEditingTask(task);
      // You may open a modal or update your UI for editing
    };


    // delete task
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
           axiosPublic.delete(`/task/${taskId}`).then((res) => {
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

    const getTitleFromType = (type) => {
      // Map the drop zone type to your task status
      switch (type) {
        case "TO_DO":
          return "todo";
        case "ONGOING":
          return "ongoing";
        case "COMPLETED":
          return "completed";
        default:
          return "todo";
      }
    };

    return (
      <div style={{ display: "flex" }}>
        <TaskList
          title="To-Do"
          tasks={tasks.filter((task) => task.status === "todo")}
          onTaskDrop={handleTaskDrop}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <TaskList
          title="Ongoing"
          tasks={tasks.filter((task) => task.status === "ongoing")}
          onTaskDrop={handleTaskDrop}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <TaskList
          title="Completed"
          tasks={tasks.filter((task) => task.status === "completed")}
          onTaskDrop={handleTaskDrop}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    );
};

export default TaskManager;