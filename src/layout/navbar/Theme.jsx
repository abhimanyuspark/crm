import { useTheme } from "../../hooks";

const Theme = () => {
  const [isOpen, toggleTheme] = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="bg-blue-500 p-2 text-white rounded-sm"
    >
      Theme {JSON.stringify(isOpen)}
    </button>
  );
};

export default Theme;
