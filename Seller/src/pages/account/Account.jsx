import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeller } from "../../store/slice/user.slice";

function Account() {
  const dispatch = useDispatch();
  const { user, seller } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSeller());
  }, []);

  return (
    <div className={`border flex h-full p-1 flex-col`}>
      <div className={``}>
        <label htmlFor="id">ID : </label>
        <h1>{user._id}</h1>
      </div>
      <div className={``}>
        <label htmlFor="name">Name</label>
        <h1>{user.name}</h1>
      </div>

      <div className={``}>
        <label htmlFor="store">Store Name</label>
        <h1>{seller.storeName}</h1>
      </div>
      <div className={``}>
        <label htmlFor="curr-address">Curr Address</label>
        <h1>{seller.storeAddress}</h1>
      </div>
    </div>
  );
}

export default Account;
