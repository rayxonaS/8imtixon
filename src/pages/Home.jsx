import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getInvoices } from "../request";
import CardSkeleton from "../components/CardSkeleton";
import MyCard from "../components/MyCard";
import InvoiceCards from "../components/InvoiceCards";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div>
      <Header />
      <InvoiceCards />
    </div>
  );
}

export default Home;
