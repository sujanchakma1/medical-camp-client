import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import { MdSystemUpdateAlt } from "react-icons/md";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Get user profile via query
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(
        `/users?email=${user.email}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
      Swal.fire({
        title: "Profile Updated Successfully!",
        icon: "success",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("my_modal_3").close();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update Failed, Please Try Again!",
      });
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const formdata = Object.fromEntries(data.entries());
    updateMutation.mutate(formdata);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 mt-6">
      <Helmet>
        <title>Profile || MedCamp</title>
      </Helmet>

      {/* Profile Card */}
      <div className="max-w-lg mx-auto  p-8 text-center">
        <img
          src={userProfile?.photoURL}
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-primary shadow"
        />
        <h2 className="text-2xl font-bold mt-4">{userProfile?.name}</h2>
        <p className="text-gray-500">{userProfile?.email}</p>
        <p className="text-gray-600 mt-1">
          {userProfile?.phone || "Phone: Not set"}
        </p>

        <button
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className="btn btn-primary btn-wide rounded-full mt-5"
        >
          <MdSystemUpdateAlt size={18}/>          Update Profile
        </button>
      </div>

      {/* ✅ Modal Dialog */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box rounded-xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold mb-4">Update Profile</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={userProfile?.name}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                defaultValue={userProfile?.photoURL}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={userProfile?.email}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                defaultValue={userProfile?.phone}
                className="input input-bordered w-full"
              />
            </div>
            <button className="btn btn-primary w-full rounded-full mt-3">
              Save Changes
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
