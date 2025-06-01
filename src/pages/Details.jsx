import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice } from "../request";
import StatusBadge from "../components/StatusBadge";
import { Button, buttonVariants } from "../components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInvoice(id)
      .then((res) => {
        setInvoice(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById(id)
      .then((res) => {
        navigate("/");
      })
      .catch(({ message }) => {
        console.log(message);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="py-5">
      <div className="w-full max-w-[730px] mx-auto px-15 pr-5 pl-5">
        <Card>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span>Status:</span>
              <StatusBadge status={invoice.status} />
            </div>
            <div className="flex gap-3">
              <Button variant="ghost">Edit</Button>
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
                      {invoice.postCode}? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 justify-end">
                    <DialogClose
                      className={buttonVariants({ variant: "ghost" })}
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
              {invoice.status === "pending" && <Button>Mark as Paid</Button>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
