import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddTask = () => {
    const { user } = useAuth();
     const axiosSecure = useAxiosSecure();
      const {
        register,
        handleSubmit,
        reset,
        // watch,
        formState: { errors },
      } = useForm();

      const onSubmit = async (data) => {
        const taskData = {
          title: data.title,
          description: data.description,
          deadlines: data.deadlines,
          priority: data.priority,
          status: "todo",
          user: user.displayName,
          email: user.email,
        };
          const taskResult = await axiosSecure.post("/task", taskData);
          console.log(taskResult);
          if (taskResult.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              text: "The task added successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
          }
      };



    return (
      <div>
        <h2 className="text-5xl font-bold">Add New Task</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Task title*</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("title", { required: true })}
              />
              {errors.title && <span>This field is required</span>}
            </div>

            <div className="flex gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Priority*</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  {...register("priority", { required: true })}
                >
                  <option disabled selected>
                    Select Priority
                  </option>
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                </select>
                {errors.priority && <span>This field is required</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Task Deadline*</span>
                </label>
                <input
                  type="date"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("deadlines", { required: true })}
                />
                {errors.deadlines && <span>This field is required</span>}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Task Description*</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Type here"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && <span>This field is required</span>}
            </div>

            <button className="btn mt-5">Add Task</button>
          </form>
        </div>
      </div>
    );
};

export default AddTask;