import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loading from "../../Loading/Loading";
import { Helmet } from "react-helmet-async";

const VolunteerManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  const [availability, setAvailability] = useState("");

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/volunteers");
      setVolunteers(res.data);
    } catch (error) {
      console.error("Failed to fetch volunteers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleAddVolunteer = async (e) => {
    e.preventDefault();
    if (!name || !contact || !role || !availability) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    try {
      await axiosSecure.post("/volunteers", {
        name,
        contact,
        role,
        availability,
      });
      Swal.fire("Success", "Volunteer added successfully", "success");
      setName("");
      setContact("");
      setRole("");
      setAvailability("");
      fetchVolunteers();
    } catch (error) {
      Swal.fire("Error", "Failed to add volunteer", error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the volunteer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/volunteers/${id}`);
          Swal.fire("Deleted!", "Volunteer removed.", "success");
          fetchVolunteers();
        } catch (error) {
          Swal.fire("Error", "Failed to delete volunteer", error);
        }
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <Helmet>
        <title>Volunteer Management || MedCamp</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-center">
        Volunteer Management
      </h2>

      <form onSubmit={handleAddVolunteer} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Role (e.g. Registration, Medical Aid)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Availability (dates or times)"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn rounded-full btn-primary w-full">
          Add Volunteer
        </button>
      </form>

      <div className="">
        <table className="table w-full overflow-x-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No volunteers found.
                </td>
              </tr>
            ) : (
              volunteers.map((v) => (
                <tr key={v._id}>
                  <td>{v.name}</td>
                  <td>{v.contact}</td>
                  <td>{v.role}</td>
                  <td>{v.availability}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="btn  btn-error rounded-2xl btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerManagement;
