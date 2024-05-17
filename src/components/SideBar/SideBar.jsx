import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { getUserData } from "@/utils/authStorage";

export default function SideBar() {
  const userData = getUserData().userData;
  console.log(userData);

  const location = useLocation();

  const path = location.pathname;

  const isActive = (pathName) => {
    if (path === pathName) {
      return "bg-orange-400 dark:bg-gray-800 text-white dark:text-gray-100";
    }
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <div>
      <aside className="flex flex-col h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <img
              className="object-cover shadow-sm border-b-2 pb-9"
              src="https://res.cloudinary.com/helpbuddy01/image/upload/v1713707997/ahxdyb2dhtyzjll5jt3a.png"
              alt="avatar"
            />

            <Link
              //   className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
              className={`${isActive(
                "/"
              )} flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-orange-200 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
              to="/"
            >
              <span className="mx-4 font-medium">Dashboard</span>
            </Link>
            <Link
              className={`${isActive(
                "/manageUser"
              )} flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-orange-200 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
              to="/manageUser"
            >
              <span className="mx-4 font-medium">ManageUser</span>
            </Link>
            <Link
              className={`${isActive(
                "/manageHelpPost"
              )} flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-orange-200 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
              to="/manageHelpPost"
            >
              <span className="mx-4 font-medium">Manage HelpPost</span>
            </Link>
            <Link
              className={`${isActive(
                "/withdrawRequest"
              )} flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-orange-200 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
              to="/withdrawRequest"
            >
              <span className="mx-4 font-medium">Withdraw Request</span>
            </Link>
            <hr className="my-6 border-gray-200 dark:border-gray-600" />
          </nav>
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center px-4 -mx-2">
              <img
                className="object-cover mx-2 rounded-full h-14 w-14"
                src={userData.profilePictureUrl}
                alt="avatar"
              />
              <h1 className="mx-2 font-medium text-gray-800 dark:text-gray-200">
                {userData.firstName}
                {userData.lastName}
              </h1>
            </a>

            <Button
              className="flex bg-red-500 rounded-lg px-2 py-4 items-center  mx-1"
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                window.location.href = "/login";
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
