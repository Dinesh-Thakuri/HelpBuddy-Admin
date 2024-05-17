import client from "@/api/client";
import React, { PureComponent, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";

const data = [
  { time: "9:00 AM", netProfit: 1000 },
  { time: "10:00 AM", netProfit: 1200 },
  { time: "11:00 AM", netProfit: 1500 },
  { time: "12:00 PM", netProfit: 1800 },
  { time: "1:00 PM", netProfit: 2000 },
  { time: "2:00 PM", netProfit: 2200 },
  { time: "9:00 PM", netProfit: 10000 },
];

const dataB = [
  {
    day: "Monday",
    helpPosts: 20,
  },
  {
    day: "Tuesday",
    helpPosts: 15,
  },
  {
    day: "Wednesday",
    helpPosts: 25,
  },
  // Add more data for other days
];

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalHelpPosts, setTotalHelpPosts] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalHelpOffer, setTotalHelpOffer] = useState(0);

  useEffect(() => {
    getAllUsers();
    getAllHelpPosts();
    getAdminWallet();
    getTotalHelpOffer();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await client.get("/admin/getAllUser");

      setTotalUsers(response.data.data.length);
      console.log("This is users:", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllHelpPosts = async () => {
    try {
      const response = await client.get("/admin/getAllHelpPost");

      setTotalHelpPosts(response.data.data.length);
      console.log("This is help posts:", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminWallet = async () => {
    try {
      const response = await client.get("/admin/getAdminWallet");
      setTotalBalance(response.data.data.balance);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalHelpOffer = async () => {
    try {
      const response = await client.get("/admin/getTotalHelpOffers");
      setTotalHelpOffer(response.data.data);
      console.log("This is help offer:", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <div className="w-full flex justify-between">
        <div className="flex flex-col w-1/5 shadow-xl  justify-center items-center p-4 border rounded-lg bg-gray-100">
          <span className="text-lg font-bold text-gray-800">Total Users</span>
          <span className="text-3xl font-bold text-gray-800">{totalUsers}</span>
        </div>
        <div className="flex flex-col w-1/5 shadow-xl justify-center items-center p-4 border rounded-lg bg-gray-100">
          <span className="text-lg font-bold text-gray-800">
            Total Help Posts
          </span>
          <span className="text-3xl font-bold text-gray-800">
            {totalHelpPosts}
          </span>
        </div>
        <div className="flex flex-col w-1/5 shadow-xl justify-center items-center p-4 border rounded-lg bg-gray-100">
          <span className="text-lg font-bold text-gray-800">Total Balance</span>
          <span className="text-3xl font-bold text-gray-800">
            {totalBalance}
          </span>
        </div>
        <div className="flex flex-col w-1/5 shadow-xl justify-center items-center p-4 border rounded-lg bg-gray-100">
          <span className="text-lg font-bold text-gray-800">Total Offers</span>
          <span className="text-3xl font-bold text-gray-800">
            {totalHelpOffer}
          </span>
        </div>
        <div className="flex flex-col w-1/5 shadow-xl justify-center items-center p-4 border rounded-lg bg-gray-100">
          <span className="text-lg font-bold text-gray-800">Net Profit</span>
          <span className="text-3xl font-bold text-gray-800">100</span>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-9">
        <div className="h-[60vh] w-[80vh] shadow-2xl rounded-xl">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="netProfit"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-[60vh] w-[80vh] shadow-2xl rounded-xl">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={dataB}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="helpPosts"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
