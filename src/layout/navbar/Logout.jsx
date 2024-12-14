import { logout } from "../../redux/features/reduxLogin";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPowerOff } from "../../components/icons";
import { useDispatch } from "react-redux";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/login", { replace: true }); // Redirect to the login page
      }
    });
  };

  return (
    <div
      data-tooltip-id="my-tooltip"
      data-tooltip-content="logout"
      data-tooltip-place="bottom"
      className="cursor-pointer hover:text-black  text-slate-500"
    >
      <FaPowerOff onClick={handleLogout} />
    </div>
  );
};

export default LogOut;
