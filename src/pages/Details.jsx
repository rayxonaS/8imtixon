import { useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice, updateById } from "../request";
import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import StatusBadge from "../components/StatusBadge";
import { Button, buttonVariants } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import DetailsSkeleton from "../components/DetailsSkeleton";

import { useAppStore } from "../lib/zustand";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSheetOpen, setEditedData, UpdateInvoices } = useAppStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const reducer = invoice.items?.reduce((acc, curVal) => {
    return acc + Number(curVal.quantity) * Number(curVal.price);
  }, 0);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.documentElement.dataset.theme = theme;
  }, []);

  useEffect(() => {
    setLoading(true);
    getInvoice(id)
      .then((res) => {
        setInvoice(res);
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById(id)
      .then(() => {
        console.log("Ma'lumot muvaffaqiyatli o‘chirildi!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  function handleUpdate(id, data) {
    setUpdateLoading(true);
    updateById({ id, newData: data })
      .then((res) => {
        UpdateInvoices(res);
        toast.success("Ma'lumot muvaffaqiyatli yangilandi!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  }

  function handleEdit(data) {
    setEditedData(data);
    setSheetOpen(true);
  }

  if (loading) {
    return (
      <div className="base__container">
        <DetailsSkeleton />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }
  return (
    <div className="py-5">
      <div className="base_container !mb-[24px]">
        <Button
          variant="ghost"
          className="mb-[32px]"
          onClick={() => navigate("/")}
        >
          Go back
        </Button>
        <Card>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2 !justify-between detailsStatust">
              <span>Status:</span>
              <StatusBadge status={invoice.status} />
            </div>

            <div className="flex items-center details__buttons">
              <Button
                className={"mr-[12px]"}
                onClick={() => handleEdit(invoice)}
                variant="secondary"
              >
                Edit
              </Button>

              <Dialog>
                <DialogTrigger
                  className={buttonVariants({ variant: "destructive" })}
                >
                  Delete
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete invoice #
                      {invoice?.clientAddress?.postCode}? This action cannot be
                      undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="ml-auto flex gap-3">
                    <DialogClose
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      Cancel
                    </DialogClose>
                    <Button
                      disabled={deleteLoading}
                      onClick={() => handleDelete(invoice.id)}
                      variant="destructive"
                    >
                      {deleteLoading ? "Loading..." : "Delete"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {invoice.status === "pending" && (
                <Button
                  className="ml-[12px]"
                  disabled={updateLoading}
                  onClick={() => handleUpdate(invoice.id, { status: "paid" })}
                  variant="default"
                >
                  {updateLoading ? "Loading..." : "Mark as Paid"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="details_container">
        <CardContent className="p-[40px] ">
          <div className="flex items-center-center justify-between mb-[21px]">
            <div>
              <h2>
                <span className="text-[#888EB0]">#</span>
                {invoice.clientAddress?.postCode}
              </h2>
              <h2 className="mt-[8px]">{invoice.items?.[0].name}</h2>
            </div>
            <div>
              <h3>{invoice.senderAddress?.street}</h3>
              <h3>{invoice.senderAddress?.city}</h3>
              <h3>{invoice.senderAddress?.postCode}</h3>
              <h3>{invoice.senderAddress?.country}</h3>
            </div>
          </div>
          <div className="flex items-start justify-between detailsEmailFlex">
            <div className="flex items-center gap-[65px]">
              <div>
                <div className="flex flex-col md:gap-[32px] justify-between items-start">
                  <div>
                    <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                      Invoice Date
                    </h3>
                    <h2 className="text-[15px] font-bold">
                      {invoice?.createdAt}
                    </h2>
                  </div>
                  <div>
                    <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                      Payment Due
                    </h3>
                    <h2 className="text-[15px] font-bold">
                      {invoice?.paymentDue}
                    </h2>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-[12px] text-[12px] font-normal">Bill To</h3>
                <h2 className="text-[15px] font-bold mb-[8px]">
                  {invoice?.clientName}
                </h2>
                <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                  {invoice?.clientAddress?.city}
                </h3>
                <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                  {invoice?.clientAddress?.postCode}
                </h3>
                <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                  {invoice?.senderAddress?.country}
                </h3>
              </div>
            </div>
            <div className="md:mr-[50px]">
              <h3 className="mb-[12px] text=[#DFE3FA] text-[12px] font-normal">
                Sent to
              </h3>
              <h2>{invoice?.clientEmail}</h2>
            </div>
          </div>
          <Card>
            <CardContent>
              <div className="p-[10px]">
                {invoice.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between mt-[12px] details__items"
                  >
                    <div>
                      <span>Name</span>
                      <h3 className="text-[11px] font-bold">{item.name}</h3>
                    </div>
                    <div className="flex gap-[100px]">
                      <div>
                        <span>QTy.</span>
                        <h3 className="text-[11px] font-bold">
                          {item.quantity}
                        </h3>
                      </div>
                      <div>
                        <span>Price</span>
                        <h3 className="text-[11px] font-bold">£{item.price}</h3>
                      </div>
                      <div>
                        <span>Total</span>
                        <h3 className="text-[11px] font-bold">
                          £{item.quantity * item.price}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent
              className={"flex items-center justify-between !rounded-s-none"}
            >
              <h3 className="text-[12px] font-normal">Amount Due</h3>
              <h2>£{reducer}</h2>
            </CardContent>
          </Card>
        </CardContent>
        <div className="flex gap-[10px] items-center details__buttons__footer justify-center">
          <Button onClick={() => handleEdit(invoice)} variant="secondary">
            Edit
          </Button>

          <Dialog>
            <DialogTrigger
              className={buttonVariants({ variant: "destructive" })}
            >
              Delete
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete invoice #
                  {invoice?.clientAddress?.postCode}? This action cannot be
                  undone.
                </DialogDescription>
              </DialogHeader>
              <div className="ml-auto flex gap-3">
                <DialogClose
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Cancel
                </DialogClose>
                <Button
                  disabled={deleteLoading}
                  onClick={() => handleDelete(invoice.id)}
                  variant="destructive"
                >
                  {deleteLoading ? "Loading..." : "Delete"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {invoice.status === "pending" && (
            <Button
              disabled={updateLoading}
              onClick={() => handleUpdate(invoice.id, { status: "paid" })}
              variant="default"
            >
              {updateLoading ? "Loading..." : "Mark as Paid"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Details;
