"use client"; 

import { axioIsnstance, getCookie, notify } from "@/library/helper";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import React from "react";

function DeleteBtn({ id, url,setIds,ids }) {
  const token = getCookie('admin_token')
  const router = useRouter();

  const deleteHandle = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axioIsnstance
          .delete(`${url}/delete/${id}` ,{
          headers: {
            Authorization: token,
          },
        })
          .then((response) => {
            if (response.status === 200) {
              notify(response?.data?.message, response?.data?.success);
              router.refresh(); 
              setIds(!ids);
            }
          })
          .catch((err) => {
            console.log(err);
              notify(err?.response?.data?.message, err?.response?.data?.success);
          });
      }
    });
  };

  return (
    <button
      onClick={deleteHandle}
      className="py-1 px-3 border-1 border-red-600 cursor-pointer rounded-[10px] text-[14px] bg-red-600 text-white"
    >
      Deleted
    </button>
  );
}

export default DeleteBtn;
