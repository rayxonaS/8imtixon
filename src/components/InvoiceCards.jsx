import { useEffect, useState } from "react";
import { getInvoices } from "../request";
import CardSkeleton from "./CardSkeleton";
import MyCard from "./MyCard";
import { useAppStore } from "../lib/zustand";
import NotFoundComponent from "./NotFoundComponent";

export default function InvoiceCards() {
  const { filter } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInvoices("/invoices", filter)
      .then((res) => {
        setInvoices(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  if (loading) {
    return <CardSkeleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (invoices.length === 0) {
    return <NotFoundComponent />;
  }

  return (
    <div className="container mx-auto px-15 flex flex-col gap-4">
      {invoices.map((el, index) => {
        const { createdAt, invoiceId, clientName, total, status, id } = el;
        return (
          <MyCard
            createdAt={createdAt}
            invoiceId={invoiceId}
            clientName={clientName}
            price={total}
            status={status}
            key={id}
            id={id}
          />
        );
      })}
    </div>
  );
}
