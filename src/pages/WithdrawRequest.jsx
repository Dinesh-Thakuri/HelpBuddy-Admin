import client from "@/api/client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function WithdrawRequest() {
  const [withdrawRequests, setWithdrawRequests] = useState([]);

  useEffect(() => {
    getAllWithdrawRequests();
  }, []);

  const getAllWithdrawRequests = async () => {
    try {
      const response = await client.get("/admin/getAllWithdrawalRequests");
      setWithdrawRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproveRequest = async (id, userId) => {
    try {
      const response = await client.post(
        `/admin/approveWithdrawalRequest/${id}/${userId}`
      );
      console.log(response.data);
      // Fetch updated withdrawal requests after successful approval
      toast.success("Withdrawal request approved successfully");

      getAllWithdrawRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Request Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Total Amount
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Requested Amount
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {withdrawRequests.map((withdrawRequest) => (
                    <tr key={withdrawRequest.id}>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white">
                            {withdrawRequest.user.firstName}{" "}
                            {withdrawRequest.user.middleName}{" "}
                            {withdrawRequest.user.lastName}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            {withdrawRequest.requestDate}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            {withdrawRequest.totalBalance}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            {withdrawRequest.amount}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">
                            {withdrawRequest.status}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          {withdrawRequest.status === "Pending" ? (
                            <div className="flex space-x-2">
                              <button
                                className="px-3 py-1 text-xs text-white bg-green-500 rounded"
                                onClick={() =>
                                  handleApproveRequest(
                                    withdrawRequest.withdrawMoneyRequestId,
                                    withdrawRequest.userId
                                  )
                                }
                              >
                                Approve
                              </button>
                              <button className="px-3 py-1 text-xs text-white bg-red-500 rounded">
                                Reject
                              </button>
                            </div>
                          ) : withdrawRequest.status === "Approved" ? (
                            <button className="px-3 py-1 text-xs text-white bg-green-500 rounded">
                              Approved
                            </button>
                          ) : (
                            <button className="px-3 py-1 text-xs text-white bg-red-500 rounded">
                              Rejected
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawRequest;
