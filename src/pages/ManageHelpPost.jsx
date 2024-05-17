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
import { format } from "date-fns";

function ManageHelpPosts() {
  const [helpPosts, setHelpPosts] = useState([]);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [selectedHelpPost, setSelectedHelpPost] = useState(null);
  const [status, setStatus] = useState("");
  const [selectedHelpPostId, setSelectedHelpPostId] = useState(null);

  const [filterDescription, setFilterDescription] = useState("");

  useEffect(() => {
    getAllHelpPosts();
  }, []);

  const getAllHelpPosts = async () => {
    try {
      const response = await client.get("/admin/getAllHelpPost");
      setHelpPosts(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterHelpPosts = async () => {
    try {
      const response = await client.get(
        `/admin/filterHelpPostsByDescription?description=${filterDescription}`
      );
      setHelpPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (helpPostId, newStatus) => {
    try {
      const response = await client.post(
        `/admin/updateHelpPostStatus/${helpPostId}`,
        {
          status: newStatus,
        }
      );
      console.log(response.data);

      const updatedHelpPosts = helpPosts.map((helpPost) => {
        if (helpPost.helpPostId === helpPostId) {
          return { ...helpPost, status: newStatus };
        }
        return helpPost;
      });
      setHelpPosts(updatedHelpPosts);
      setStatus("");
      setShowStatusDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDialog = (helpPost) => {
    setSelectedHelpPost(helpPost);
    setSelectedHelpPostId(helpPost.helpPostId);
    setStatus(helpPost.status);
    setShowStatusDialog(true);
  };

  return (
    <div className="shadow-md p-2 flex flex-col w-full ">
      <div className="flex flex-col ml-14">
        <h1>Filter By Description:</h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Description"
            value={filterDescription}
            onChange={(e) => setFilterDescription(e.target.value)}
          />
          <Button type="button" onClick={handleFilterHelpPosts}>
            Filter
          </Button>
        </div>
      </div>

      <section className="flex justify-center items-center">
        <div className="flex flex-col mt-6 ">
          <div className="">
            <div className="inline-block py-2 align-middle">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className=" divide-y divide-gray-200 dark:divide-gray-700 min-w-[100vh]">
                  <thead className="bg-gray-50 dark:bg-gray-800 min-w-[100vh]">
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
                        Requester
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Reward
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Post Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Post Time
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Comment Count
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Upvote Count
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
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
                    {helpPosts.map((helpPost) => (
                      <tr key={helpPost.helpPostId}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <img
                            className="object-cover w-20 h-20 rounded-md "
                            src={helpPost.helpPostPictureUrl || ""}
                            alt="avatar"
                          />
                        </td>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white">
                              {helpPost.requesterId}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {helpPost.helpPostDescription}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {helpPost.reward}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {format(
                                new Date(helpPost.postDate),
                                "yyyy-MM-dd"
                              )}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {helpPost.postTime
                                ? format(
                                    new Date(helpPost.postTime),
                                    "HH:mm:ss"
                                  )
                                : "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {helpPost.commentCount}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {helpPost.upVoteCount}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <p
                              className={`${
                                helpPost.status === "Open"
                                  ? "text-emerald-500 dark:text-emerald-400"
                                  : "text-red-500 dark:text-red-400"
                              }`}
                            >
                              {helpPost.status}
                            </p>
                          </div>
                        </td>
                        <td>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                onClick={() => handleOpenDialog(helpPost)}
                              >
                                Update Status
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>
                                  Update Status for Help Post
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Status
                                  </Label>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id="status"
                                      checked={status === "Open"}
                                      onCheckedChange={(value) =>
                                        setStatus(value ? "Open" : "Closed")
                                      }
                                    />
                                    <Label htmlFor="status">
                                      {status === "Open" ? "Open" : "Closed"}
                                    </Label>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  onClick={() =>
                                    handleUpdateStatus(
                                      helpPost.helpPostId,
                                      status
                                    )
                                  }
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

export default ManageHelpPosts;
