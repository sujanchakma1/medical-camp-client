import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddCamp = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addCampMutation = useMutation({
    mutationFn: async (campData) => {
      campData.participant_count = 0;
      const res = await axiosSecure.post("/camps", campData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Camp added successfully!", "success");
      queryClient.invalidateQueries(["camps"]);
      reset();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to add camp. Try again.", "error");
    },
  });

  const onSubmit = (data) => {
    addCampMutation.mutate(data);
  };

  return (
    <div className=" bg-base-200 p-8 rounded-lg shadow">
      <Helmet>
        <title>
          Add Camp || MedCamp
        </title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center">Add A Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Camp Name</label>
          <input
            type="text"
            placeholder="Camp Name"
            {...register("camp_name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.camp_name && <p className="text-red-500">Camp name is required</p>}
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Image URL"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.image && <p className="text-red-500">Image is required</p>}
        </div>
        <div>
          <label>Camp Fees (৳)</label>
          <input
            type="text"
            placeholder="Camp Fees (৳)"
            {...register("camp_fees", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.camp_fees && <p className="text-red-500">Fees is required</p>}
        </div>
        <div>
          <label>Date & Time</label>
          <input
            type="text"
            placeholder="e.g. 2025-08-18 | 09:00 AM - 02:00 PM"
            {...register("date_time", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.date_time && <p className="text-red-500">Date & Time required</p>}
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.location && <p className="text-red-500">Location is required</p>}
        </div>
        <div>
          <label>Healthcare Professional Name</label>
          <input
            type="text"
            placeholder="Healthcare Professional Name"
            {...register("healthcare_professional", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.healthcare_professional && (
            <p className="text-red-500">Healthcare name is required</p>
          )}
        </div>
        <div>
          <label>Description</label>
          <textarea
            placeholder="Description"
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && <p className="text-red-500">Description required</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Camp
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
