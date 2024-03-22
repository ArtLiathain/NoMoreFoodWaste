import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";

type DataType = {
  product_name: string;
  purchase_date: Date;
  barcode: number;
};

const FoodTable = ({ email }: { email: string }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [filter, setFilter] = useState("");

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();

    setData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData(
      `http://BackendLB-1190462709.us-east-1.elb.amazonaws.com/getuserfood?email=${email}`
    );
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(
      `http://BackendLB-1190462709.us-east-1.elb.amazonaws.com/getuserfoodfilter?email=${email}&filter=${filter}`
    );
  };

  return (
    <div className="flex gap-2 flex-col p-3 bg-dark min-h-[90vh] overflow-auto">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={handleFilterChange}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mt-2"
        />
      </form>
      {data.length > 0 ? (
        data.map((elem) => (
          <div>
            <TableRow
              key={elem.product_name}
              name={elem.product_name}
              datetime={new Date(elem.purchase_date)}
            ></TableRow>
          </div>
        ))
      ) : (
        <div className="text-dark  text-6xl bg-highlight p-4 rounded-lg ">
          Waiting on your food...
        </div>
      )}
    </div>
  );
};

export default FoodTable;
