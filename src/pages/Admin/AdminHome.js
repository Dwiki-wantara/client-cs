import React from "react";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import AdminHomeTransaction from "../../components/Admin/AdminTransaction";

export default function LayoutAdmin() {
  return (
    <div>
      <NavbarAdmin />
      <AdminHomeTransaction />
    </div>
  );
}
