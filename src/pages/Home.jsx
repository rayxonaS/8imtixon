import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getInvoices } from "../request";
import CardSkeleton from "../components/CardSkeleton";
import MyCard from "../components/MyCard";
import InvoiceCards from "../components/InvoiceCards";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInvoices("/invoices")
      .then((res) => {
        setInvoices(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CardSkeleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <InvoiceCards />
    </div>
  );
}

export default Home;
