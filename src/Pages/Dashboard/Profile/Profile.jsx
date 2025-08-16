import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";
import { Helmet } from "react-helmet-async";

// QueryClient init
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
      document.getElementById("my_modal_3").close(); // close modal
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Updated Failed, Please Try Again!",
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

  if (isLoading) return <Loading></Loading>;

  return (
    <div className=" p-6 mt-6">
      <Helmet>
              <title>
                Profile || MedCamp
              </title>
            </Helmet>
      <div className="items-center gap-6">
        <img
          src={userProfile?.photoURL}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-semibold">{userProfile?.name}</h2>
          <p className="text-gray-600">{userProfile?.email}</p>
          <p className="text-gray-600">
            {userProfile?.phone || "Phone: not set"}
          </p>
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="btn rounded-full btn-primary mt-3"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* ✅ Modal Dialog for Profile Update */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn  btn-sm  btn-circle rounded-2xl btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleUpdate} className="">
            <fieldset className="fieldset space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={userProfile?.name}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  defaultValue={userProfile?.photoURL}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={userProfile?.email}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={userProfile?.phone}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <button className="btn rounded-full btn-primary w-full">Save Changes</button>
            </fieldset>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
