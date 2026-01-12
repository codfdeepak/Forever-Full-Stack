import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          token,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className=" pt-26 min-h-screen flex items-center justify-center bg-gray-50 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Mobile</label>
            <input
              type="text"
              value={user.mobile || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>
        </div>

        <button className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Edit Profile (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default Profile;
