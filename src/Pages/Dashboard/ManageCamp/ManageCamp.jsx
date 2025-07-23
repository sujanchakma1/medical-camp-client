import { useState, useEffect } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loading from "../../Loading/Loading";
import { Helmet } from "react-helmet-async";

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [camps, setCamps] = useState([]);

  const fetchCamps = async (searchValue = "") => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(
        `/camps${searchValue ? `?search=${searchValue}` : ""}`
      );
      setCamps(res.data);
    } catch (err) {
      console.error("Error fetching camps:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamps(); // initial load
  }, []);

  const handleSearch = () => {
    fetchCamps(search.trim());
  };

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
        axiosSecure
          .delete(`/delete-camp/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Camp deleted successfully.", "success");
            fetchCamps(search); // reload after delete
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete the camp.", "error");
          });
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 overflow-x-auto">
      <Helmet>
        <title>Manage Camp || MedCamp</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Camps</h2>

      {/* Search input with button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by camp name, date, or professional"
          className="input input-bordered w-full max-w-md"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Table */}
      <table className="table table-zebra w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th>
            <th>Camp Name</th>
            <th>Participant Count</th>
            <th>Date</th>
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
              <td>{camp.date_time}</td>
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
