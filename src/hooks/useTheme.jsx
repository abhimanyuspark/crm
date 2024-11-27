import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/features/layoutSlice";

export const useTheme = () => {
  const { theme } = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  const ToggleTheme = () => {
    const newState = !theme;
    // console.log("New State:", newState); // Check if newState is correct
    dispatch(toggleTheme(newState));
  };

  return [theme, ToggleTheme];
};
