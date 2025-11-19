import { ToastContainer, toast } from "react-toastify";
const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });

import axios from "axios";

const axioIsnstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API__BASE_URL, 
}); 

function createSlug(text) {
  return text
    .toString() // ensure string
    .toLowerCase() // lowercase
    .trim() // remove spaces from start & end
    .replace(/\s+/g, "-") // spaces → dashes
    .replace(/[^\w\-]+/g, "") // remove special chars
    .replace(/\-\-+/g, "-"); // multiple dashes → single dash
}

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function formatIndianCurrency(amount = 0) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

export { createSlug, notify, axioIsnstance, getCookie, formatIndianCurrency };
