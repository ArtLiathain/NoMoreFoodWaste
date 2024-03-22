import FoodTable from "../FoodTable/FoodTable";
import { Box } from "@chakra-ui/react";

const TablePage = ({
  email,
  onUserLogout,
}: {
  email: any;
  onUserLogout: (email: any) => void;
}) => {
  // Implement the TablePage component logic here

  const handleLogout = () => {
    onUserLogout("");
  };

  return (
    <div className="bg-light min-w-full flex-grow flex justify-between items-start">
      <Box boxSize="lg" height="100%">
        <FoodTable email={email}></FoodTable>
      </Box>

      <button
        onClick={handleLogout}
        className=" py-2 px-4 text-3xl mr-10 bg-dark text-highlight mt-4 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default TablePage;
