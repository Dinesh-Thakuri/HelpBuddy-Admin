import client from "@/api/client";
import { Button } from "../components/ui/button";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [showBioDialog, setShowBioDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSuspended, setIsSuspended] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Add this line

  const [filterName, setFilterName] = useState("");
  console.log("This is filterName:", filterName);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await client.get("/admin/getAllUser");
      setUsers(response.data.data);

      console.log("This is users:", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterUsers = async () => {
    try {
      const response = await client.get(
        `/admin/filterUsersByName?name=${filterName}`
      );
      console.log("This is response for filter:", response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      const response = await client.post(`/admin/suspendUser/${userId}`, {
        isSuspended: !isSuspended,
      });
      console.log(response.data);

      const updatedUsers = users.map((user) => {
        if (user.userId === userId) {
          return { ...user, isSuspended: !user.isSuspended };
        }
        return user;
      });
      setUsers(updatedUsers);
      setIsSuspended(false); // Reset isSuspended state after API call
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setSelectedUserId(user.userId);
    setIsSuspended(user.isSuspended);
  };

  return (
    <div className="shadow-md p-2">
      <div>
        <h1>Filter By name:</h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
          <Button type="button" onClick={handleFilterUsers}>
            Filter
          </Button>
        </div>
      </div>

      <section className=" overflow-x-scroll" id="no-scrollbar">
        <div className="flex flex-col mt-6">
          <div className="">
            <div className="inline-block  py-2 align-middle">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className=" divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Photo
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Date Of Birth
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Designation
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        EmailVerified
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        ProfilePicVerified
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        UserIsSuspended
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {users.map((user) => (
                      <tr key={user.userId}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <img
                            className="object-cover w-20 h-20 rounded-md "
                            src={user.profilePictureUrl || ""}
                            alt="avatar"
                          />
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white">
                              {`${user.firstName} ${user.lastName}`}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {user.dateOfBirth}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {user.address}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {user.phoneNumber}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {user.designation || "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p
                              className={`${
                                user.isEmailVerified
                                  ? "text-emerald-500 dark:text-emerald-400"
                                  : "text-red-500 dark:text-red-400"
                              }`}
                            >
                              {user.isEmailVerified ? "Yes" : "No"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p
                              className={`${
                                user.isProfilePictureVerified
                                  ? "text-emerald-500 dark:text-emerald-400"
                                  : "text-red-500 dark:text-red-400"
                              }`}
                            >
                              {user.isProfilePictureVerified ? "Yes" : "No"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p
                              className={`${
                                user.isSuspended
                                  ? "text-red-500 dark:text-red-400"
                                  : "text-emerald-500 dark:text-emerald-400"
                              }`}
                            >
                              {user.isSuspended ? "Yes" : "No"}
                            </p>
                          </div>
                        </td>
                        <td>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                onClick={() => handleOpenDialog(user)}
                              >
                                Edit Profile
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>
                                  Suspend user {user.firstName}{" "}
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    UnSuspend
                                  </Label>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id="suspend"
                                      // checked={user.isSuspended}
                                      onCheckedChange={(value) =>
                                        setIsSuspended(value)
                                      }
                                    />
                                    <Label htmlFor="suspend">Suspended</Label>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  onClick={() => handleSuspendUser(user.userId)}
                                >
                                  Save changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageUser;
