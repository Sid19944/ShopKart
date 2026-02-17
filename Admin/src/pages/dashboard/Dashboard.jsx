import React from "react";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Dashboard() {
  return (
    <div className="h-screen p-1">
      <nav
        id="sidenav"
        className="border w-50 h-full shadow-[0px_0px_2px_2px] shadow-white rounded-r-lg"
      >
        <div className="h-10 flex items-center justify-center gap-2 p-1 border-b">
          <ContactEmergencyIcon />
          <p className="font-semibold">Admin Panel</p>
        </div>
        <div>
          <p>MAIN MENU</p>
          <div>
            <GroupIcon />
            <p>Users</p>
          </div>
          <div>
            <StorefrontIcon />
            Sellers
          </div>
          <div>
            <InventoryIcon />
            Products
          </div>
          <div>
            <ShoppingCartIcon />
            <p>Orders</p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Dashboard;
