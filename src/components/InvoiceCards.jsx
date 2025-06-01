import { useEffect, useState } from "react";
import { getInvoices } from "../request";
import CardSkeleton from "./CardSkeleton";
import MyCard from "./MyCard";
import { useAppStore } from "../lib/zustand";
import NotFoundComponent from "./NotFoundComponent";

export default function InvoiceCards() {
  const { filter, invoices, setInvoices } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInvoices(filter)
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
    <div className=" w-full max-w-[730px] mx-auto px-15 pr-5 pl-5 md:pl-20 flex flex-col gap-4">
      {invoices.map((el, index) => {
        const { createdAt, clientName, total, status, id } = el;
        return (
          <MyCard
            createdAt={createdAt}
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
