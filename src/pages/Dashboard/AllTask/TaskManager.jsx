import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TaskList from "./TaskList";

const TaskManager = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const handleTaskDrop = async (result) => {
        console.log("Droppable ID:", result.destination?.droppableId);
        console.log("Draggable ID:", result.draggableId);
        
      if (!result.destination) return; // dropped outside the list

      const updatedTasks = [...tasks];
      const [removed] = updatedTasks.splice(result.source.index, 1);
      updatedTasks.splice(result.destination.index, 0, removed);

      setTasks(updatedTasks);

      // Make an API call to update the task status
      await axiosSecure.patch(`/tasks/${removed._id}`, {
        ...removed,
        status: getTitleFromType(result.destination.droppableId),
      });
    };

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
      //   <DragDropContext onDragEnd={handleTaskDrop}>
      //     <div style={{ display: "flex" }}>
      //       <Droppable droppableId="TO_DO">
      //         {(provided) => (
      //           <div
      //             {...provided.droppableProps}
      //             ref={provided.innerRef}
      //             style={{
      //               border: "2px dashed #000",
      //               padding: "16px",
      //               marginRight: "16px",
      //             }}
      //           >
      //             <h3>To-Do</h3>
      //             {tasks
      //               .filter((task) => task.status === "todo")
      //               .map((task, index) => (
      //                 <Draggable
      //                   key={task._id}
      //                   draggableId={task._id}
      //                   index={index}
      //                 >
      //                   {(provided) => (
      //                     <div
      //                       ref={provided.innerRef}
      //                       {...provided.draggableProps}
      //                       {...provided.dragHandleProps}
      //                     >
      //                       <Task
      //                         task={task}
      //                         onEdit={() => {}}
      //                         onDelete={handleDelete}
      //                       />
      //                     </div>
      //                   )}
      //                 </Draggable>
      //               ))}
      //             {provided.placeholder}
      //           </div>
      //         )}
      //       </Droppable>

      //       <Droppable droppableId="ONGOING">
      //         {(provided) => (
      //           <div
      //             {...provided.droppableProps}
      //             ref={provided.innerRef}
      //             style={{
      //               border: "2px dashed #000",
      //               padding: "16px",
      //               marginRight: "16px",
      //             }}
      //           >
      //             <h3>Ongoing</h3>
      //             {tasks
      //               .filter((task) => task.status === "ongoing")
      //               .map((task, index) => (
      //                 <Draggable
      //                   key={task._id}
      //                   draggableId={task._id}
      //                   index={index}
      //                 >
      //                   {(provided) => (
      //                     <div
      //                       ref={provided.innerRef}
      //                       {...provided.draggableProps}
      //                       {...provided.dragHandleProps}
      //                     >
      //                       <Task
      //                         task={task}
      //                         onEdit={() => {}}
      //                         onDelete={handleDelete}
      //                       />
      //                     </div>
      //                   )}
      //                 </Draggable>
      //               ))}
      //             {provided.placeholder}
      //           </div>
      //         )}
      //       </Droppable>

      //       <Droppable droppableId="COMPLETED">
      //         {(provided) => (
      //           <div
      //             {...provided.droppableProps}
      //             ref={provided.innerRef}
      //             style={{
      //               border: "2px dashed #000",
      //               padding: "16px",
      //               marginRight: "16px",
      //             }}
      //           >
      //             <h3>Completed</h3>
      //             {tasks
      //               .filter((task) => task.status === "completed")
      //               .map((task, index) => (
      //                 <Draggable
      //                   key={task._id}
      //                   draggableId={task._id}
      //                   index={index}
      //                 >
      //                   {(provided) => (
      //                     <div
      //                       ref={provided.innerRef}
      //                       {...provided.draggableProps}
      //                       {...provided.dragHandleProps}
      //                     >
      //                       <Task
      //                         task={task}
      //                         onEdit={() => {}}
      //                         onDelete={handleDelete}
      //                       />
      //                     </div>
      //                   )}
      //                 </Draggable>
      //               ))}
      //             {provided.placeholder}
      //           </div>
      //         )}
      //       </Droppable>
      //     </div>
      //   </DragDropContext>

      <DragDropContext onDragEnd={handleTaskDrop}>
        <div className="grid lg:grid-cols-2 gap-5">
          <TaskList
            title="TO_DO"
            tasks={tasks.filter((task) => task.status === "todo")}
            onDelete={handleDelete}
          />
          <TaskList
            title="ONGOING"
            tasks={tasks.filter((task) => task.status === "ongoing")}
            onDelete={handleDelete}
          />
          <TaskList
            title="COMPLETED"
            tasks={tasks.filter((task) => task.status === "completed")}
            onDelete={handleDelete}
          />
        </div>
      </DragDropContext>
    );
};

export default TaskManager;