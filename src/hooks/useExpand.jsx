import { useDispatch, useSelector } from "react-redux";
import { toggleExpand } from "../redux/features/layoutSlice";

export const useExpand = () => {
  const { expand } = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  const change = (newState) => {
    dispatch(toggleExpand(newState));
  };

  return [expand, change];
};
