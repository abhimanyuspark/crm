import { useDispatch, useSelector } from "react-redux";
import { toggleSide } from "../redux/features/layoutSlice";

export const useSideBar = () => {
  const { side } = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    const newState = !side;
    // console.log("New State:", newState); // Check if newState is correct
    dispatch(toggleSide(newState));
  };

  // console.log("Current Side:", side, typeof side); // Check the current value of side
  return [side, toggleSidebar];
};
