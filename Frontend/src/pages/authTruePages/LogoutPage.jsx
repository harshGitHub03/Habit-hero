import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../redux/thunks/authThunks";

const LogoutModal = ({ onClose }) => {
  const { isAuthenticated } = useSelector((store) => store.authData)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutThunk())
    if (isAuthenticated)
      navigate("/")
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/80 p-8 rounded-2xl shadow-lg border border-gray-200 w-[90%] max-w-sm animate-scaleIn">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Confirm Logout</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LogoutModal;

