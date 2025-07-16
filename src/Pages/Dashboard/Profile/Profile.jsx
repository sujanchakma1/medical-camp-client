import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog } from "@headlessui/react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({});

  // ✅ Get user profile via query
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user.email}`);
      setForm(res.data); // set for editing form
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Update user profile via PATCH
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      return await axiosInstance.patch(`/users?email=${user.email}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
      setIsOpen(false);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate(form);
  };

  if (isLoading) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
      <div className="flex items-center gap-6">
        <img
          src={userProfile?.photoURL || "https://i.ibb.co/Jt8s8rZ/profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-semibold">{userProfile?.name}</h2>
          <p className="text-gray-600">{userProfile?.email}</p>
          <p className="text-gray-600">{userProfile?.phone || "Phone: not set"}</p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* ✅ Modal Dialog for Profile Update */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
            <Dialog.Title className="text-xl font-bold mb-4">Edit Profile</Dialog.Title>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={form.displayName || ""}
                  onChange={handleChange}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label>Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  value={form.photoURL || ""}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={form.email}
                  readOnly
                  className="input w-full bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone || ""}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              <button
                type="submit"
                className="btn bg-blue-600 text-white hover:bg-blue-700 w-full"
              >
                Save Changes
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Profile;
