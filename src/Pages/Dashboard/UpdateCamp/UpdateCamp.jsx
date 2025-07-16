import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const UpdateCamp = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch camp data
  const { data: campData, isLoading } = useQuery({
    queryKey: ["camp", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camps/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Mutation for updating camp
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      return await axiosSecure.patch(`/update-camp/${id}`, updatedData);
    },
    onSuccess: () => {
      Swal.fire("Success!", "Camp updated successfully", "success");
      queryClient.invalidateQueries(["camps"]);
      navigate("/dashboard/manage-camp");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update camp", "error");
    },
  });

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // participant_count should remain number, if included
    if (data.participant_count) {
      data.participant_count = Number(data.participant_count);
    }

    // You can add simple validation here if needed
    if (
      !data.camp_name ||
      !data.image ||
      !data.camp_fees ||
      !data.date_time ||
      !data.location ||
      !data.healthcare_professional ||
      !data.description
    ) {
      Swal.fire("Warning", "Please fill all required fields!", "warning");
      return;
    }

    updateMutation.mutate(data);
  };

  if (isLoading) return <p className="text-center py-10">Loading camp data...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Camp</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Camp Name</label>
          <input
            type="text"
            name="camp_name"
            defaultValue={campData?.camp_name || ""}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={campData?.image || ""}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Camp Fees (৳)</label>
          <input
            type="text"
            name="camp_fees"
            defaultValue={campData?.camp_fees || ""}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Date & Time</label>
          <input
            type="text"
            name="date_time"
            defaultValue={campData?.date_time || ""}
            className="input input-bordered w-full"
            placeholder="2025-08-18 | 09:00 AM - 02:00 PM"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={campData?.location || ""}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Healthcare Professional Name</label>
          <input
            type="text"
            name="healthcare_professional"
            defaultValue={campData?.healthcare_professional || ""}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={campData?.description || ""}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Participant Count</label>
          <input
            type="number"
            name="participant_count"
            defaultValue={campData?.participant_count || 0}
            className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
            readOnly
          />
        </div>

        <button
          type="submit"
          disabled={updateMutation.isLoading}
          className="btn btn-primary w-full mt-4"
        >
          {updateMutation.isLoading ? "Updating..." : "Update Camp"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCamp;
