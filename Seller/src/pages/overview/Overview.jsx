import React from "react";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";

import CountUp from "react-countup";
import { useEffect } from "react";
import { useState } from "react";
import { sellerUrl } from "../../Api";

import toast from "react-hot-toast";

import ProductChart from "../chart/ProductChart";
import RevenueChart from "../chart/RevenueChart";
import SalesChart from "../chart/SalesChart";
import { useSelector } from "react-redux";

function Overview() {
  const [data, setData] = useState("");
  const [monthlyReport, setMothlyReport] = useState("");
  const {mode} = useSelector(state=>state.user)
  useEffect(() => {
    (async () => {
      await sellerUrl
        .get("/get-overview-info")
        .then((res) => setData(res.data))
        .catch((err) =>
          toast.error(err?.response?.data?.message || err.message),
        );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await sellerUrl
        .get("/get-monthly-report")
        .then((res) => setMothlyReport(res.data))
        .catch((err) =>
          toast.error(err?.response?.data?.message || err.message),
        );
    })();
  }, []);

  return (
    <div className={`flex flex-col h-full ${mode && "bg-gray-400" }`}>
      <div className="overflow-auto flex flex-col gap-1">
        <div
          id="top"
          className="flex flex-wrap w-full justify-around p-2 gap-1"
        >
          <div className={`border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px] min-w-40 sm:w-[31%] w-[95%] ${mode ? "bg-white" : "bg-gray-900"}`}>
            <div className="flex justify-between ">
              <span className="text-blue-600 bg-blue-300 border px-2 rounded-lg">
                <AccountBalanceWalletIcon />
              </span>
              <span className="text-green-900 text-xs bg-green-300 h-fit rounded-lg px-1">
                +
                <CountUp
                  end={(data.lastThirtyDayRevenue * 100) / data.totalRevenue}
                  duration={2}
                />
                %
              </span>
            </div>
            <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
              TOTAL REVENUE
            </label>
            <h1 className="text-3xl flex gap-1 items-baseline">
              ₹<CountUp end={data.lastThirtyDayRevenue} duration={2} />
            </h1>
            <span className="text-xs text-gray-500 flex flex-col">
              <span>vs last month,</span>
              <span className="text-gray-400">
                TOTAL REVENUE : ₹
                <CountUp end={data.totalRevenue} duration={1} />
              </span>
            </span>
          </div>

          <div className={`border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px] min-w-40 sm:w-[31%] w-[95%] ${mode ? "bg-white" : "bg-gray-900"}`}>
            <div className="flex justify-between">
              <span className="border px-2 rounded-lg bg-green-300 text-green-700">
                <LocalShippingIcon />
              </span>
              <span className="text-green-900 text-xs bg-green-300 h-fit rounded-lg px-1">
                +
                <CountUp
                  end={(data.lastThirtyDaySales * 100) / data.totalSales}
                  duration={2}
                />
                %
              </span>
            </div>
            <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
              TOTAL SALE'S
            </label>
            <h1 className="text-3xl flex gap-1 items-baseline">
              <CountUp end={data.lastThirtyDaySales} duration={2} />
            </h1>
            <span className="text-xs text-gray-500 flex flex-col">
              <span>vs last month,</span>
              <span className="text-gray-400">
                TOTAL SALE'S : <CountUp end={data.totalSales} duration={1} />
              </span>
            </span>
          </div>
          <div className={`border p-3 rounded-lg overflow-hidden hover:shadow-[0px_0px_3px_3px] min-w-40 sm:w-[31%] w-[95%] ${mode ? "bg-white" : "bg-gray-900"}`}>
            <div className="flex justify-between">
              <span className="text-purple-600 bg-purple-300 border px-2 rounded-lg">
                <InventoryIcon />
              </span>
              <span className="text-green-900 text-xs bg-green-300 h-fit rounded-lg px-1">
                +
                <CountUp
                  end={(data.lastThirtyDayProducts * 100) / data.totalProduct}
                  duration={2}
                />
                %
              </span>
            </div>
            <label className="flex gap-5 text-gray-400 items-center tracking-[1px]">
              TOTAL PRODUCT'S
            </label>
            <h1 className="text-3xl flex gap-1 items-baseline">
              <CountUp end={data.lastThirtyDayProducts} duration={2} />
            </h1>
            <span className="text-xs text-gray-500 flex flex-col">
              <span>vs last month,</span>
              <span className="text-gray-400">
                TOTAL PRODUCT'S :{" "}
                <CountUp end={data.totalProduct} duration={1} />
              </span>
            </span>
          </div>
        </div>

        <div className="w-full flex gap-1 flex-wrap justify-around ">
          <div className={`border border-dashed sm:w-[70%] w-full p-1 ${mode ? "bg-white" : "bg-gray-900"} rounded-lg`}>
            <ProductChart productReport={monthlyReport.productReport} />
          </div>
          <div className={`border border-dashed sm:w-[28%] w-full p-1 gap-3 flex flex-col rounded-lg ${mode ? "bg-white" : "bg-gray-900"}`}>
            <div className="flex flex-wrap gap-2 items-center">
              <h1>Total Product :</h1>
              <CountUp
                end={data.totalProduct}
                duration={2}
                className="text-2xl"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <h1>Product Added Last 30 days :</h1>
              <CountUp
                end={data.lastThirtyDayProducts}
                duration={2}
                className="text-2xl"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex gap-1 flex-wrap justify-around">
          <div className={`border border-dashed sm:w-[70%] w-full p-1 rounded-lg ${mode ? "bg-white" : "bg-gray-900"}`}>
            <RevenueChart revenueReport={monthlyReport.revenueReport} />
          </div>
          <div className={`border border-dashed sm:w-[28%] w-full p-1 gap-3 flex flex-col rounded-lg ${mode ? "bg-white" : "bg-gray-900"}`}>
            <div className="flex flex-wrap gap-2 items-center">
              <h1>Total Revenue :</h1>
              <CountUp
                end={data.totalRevenue}
                duration={2}
                className="text-2xl"
              />
            </div>
            <div className={`flex flex-wrap gap-2 items-center `}>
              <h1>Renenue Last 30 days :</h1>
              <CountUp
                end={data.lastThirtyDayRevenue}
                duration={2}
                className="text-2xl"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex gap-1 flex-wrap justify-around">
          <div className={`border border-dashed sm:w-[70%] w-full p-1 rounded-lg ${mode ? "bg-white" : "bg-gray-900"}`}>
            <SalesChart saleReport={monthlyReport.saleReport} />
          </div>
          <div className={`border border-dashed sm:w-[28%] w-full p-1 gap-3 flex flex-col rounded-lg ${mode ? "bg-white" : "bg-gray-900"}`}>
            <div className="flex flex-wrap gap-2 items-center">
              <h1>Total Sales :</h1>
              <CountUp
                end={data.totalSales}
                duration={2}
                className="text-2xl"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <h1>Sales Last 30 days :</h1>
              <CountUp
                end={data.lastThirtyDaySales}
                duration={2}
                className="text-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
