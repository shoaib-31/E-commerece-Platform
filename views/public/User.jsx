import React from "react";

const User = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      id="user-circle"
      height="2.5rem"
      width="2.5rem"
    >
      <rect width="256" height="256" fill="none"></rect>
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></circle>
      <circle
        cx="128"
        cy="120"
        r="40"
        fill="none"
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></circle>
      <path
        fill="none"
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
        d="M63.79905,199.37405a72.02812,72.02812,0,0,1,128.40177-.00026"
      ></path>
    </svg>
  );
};

export default User;
