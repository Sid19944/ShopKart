import React from "react";

function AccountInfo({user}) {
  return (
    <div className="w-full border rounded-lg p-1 flex flex-col gap-5 text-xl overflow-auto">
      <h1 className="text-blue-500 flex gap-2 items-center justify-between flex-wrap">
        Personal Information <span className="text-sm">User ID : {user?._id}</span>
      </h1>

      <div className="flex gap-3 items-center font-semibold flex-wrap">
        <label htmlFor="name">Full Name :</label>
        <h1>{user?.name}</h1>
      </div>
      <div className="flex gap-3 items-center font-semibold flex-wrap">
        <label htmlFor="role">User Type :</label>
        <h1>{user?.role}</h1>
      </div>
      <div className="flex gap-3 items-center font-semibold flex-wrap">
        <label htmlFor="email">Email ID :</label>
        <h1>{user?.email}</h1>
      </div>
      <div className="flex gap-3 items-center font-semibold flex-wrap">
        <label htmlFor="provider">Login By :</label>
        <h1 className="flex">{user?.provider?.toUpperCase()}</h1>
      </div>
      <div className="flex gap-3 items-center font-semibold flex-wrap">
        <label htmlFor="isApproved">Approved :</label>
        <h1>{user?.isApproved ? "YES" : "BLOCKED"}</h1>
      </div>
    </div>
  );
}

export default AccountInfo;
