import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

// Icons
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camps");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/delete-camp/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Camp deleted successfully.", "success");
      queryClient.invalidateQueries(["camps"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete the camp.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading Camps...</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Camps</h2>

      <table className="table table-zebra w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th>
            <th>Camp Name</th>
            <th>Participant Count</th>
            <th>Location</th>
            <th>Healthcare Professional</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {camps.map((camp, index) => (
            <tr key={camp._id}>
              <td>{index + 1}</td>
              <td>{camp.camp_name}</td>
              <td>{camp.participant_count || 0}</td>
              <td>{camp.location}</td>
              <td>{camp.healthcare_professional}</td>
              <td className="space-x-2">
                <Link
                  to={`/dashboard/update-camp/${camp._id}`}
                  className="btn btn-sm btn-warning flex items-center gap-1"
                >
                  <FaEdit />
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(camp._id)}
                  className="btn btn-sm btn-error flex items-center gap-1"
                >
                  <FaTrashAlt />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCamp;
