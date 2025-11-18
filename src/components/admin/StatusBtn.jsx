"use client";   

import { axioIsnstance, getCookie, notify } from "@/library/helper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function StatusBtn({ id, status , url }) {
  const token = getCookie('admin_token')
  // console.log(token,'token');
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(status);

  const statusHandler = () => {
    axioIsnstance
      .patch(`${url}/status/${id}`,{},{
          headers: {
            Authorization: token,
          },
        })
      .then((response) => {
        if (response.status === 200) {
          notify(response.data.message, response.data.success);
          setCurrentStatus(!currentStatus);
          router.refresh();
        }
      })
      .catch((err) => {
        console.log(err);
        notify(err.response.data.message, err.response.data.success);
      });
  };

  return (
    <span
      onClick={statusHandler}
      className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
        currentStatus
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      {currentStatus ? "Active" : "Inactive"}
    </span>
  );
}

export default StatusBtn;
