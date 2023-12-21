import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const task = useLoaderData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const taskData = {
      title: data.title,
      description: data.description,
      deadlines: data.deadlines,
      priority: data.priority,
      status: data.status,
      user: user?.displayName,
      email: user?.email,
    };
    const taskResult = await axiosSecure.patch(`/task/${task._id}`, taskData);
    if (taskResult.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        text: "The task Updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      navigate("/dashboard/allTask");
    }
  };
  return (
    <div>
      <h2 className="text-5xl font-bold">Edit Task</h2>
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
              defaultValue={task?.title}
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
                defaultValue={task?.priority}
                {...register("priority", { required: true })}
              >
                <option disabled selected>
                  Select Priority
                </option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
              {errors.priority && <span>This field is required</span>}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Status*</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                defaultValue={task?.status}
                {...register("status", { required: true })}
              >
                <option disabled selected>
                  Select Status
                </option>
                <option value="todo">TO_DO</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && <span>This field is required</span>}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Task Deadline*</span>
              </label>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
                defaultValue={task?.deadlines}
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
              defaultValue={task?.description}
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && <span>This field is required</span>}
          </div>

          <button className="btn mt-5">Edit Task</button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
