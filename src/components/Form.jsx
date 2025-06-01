import ItemList from "./ItemList";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "./ui/select";
import { Button } from "./ui/button";
import { prepareData } from "../lib/utils";
import { useAppStore } from "../lib/zustand";
import { useEffect, useState } from "react";
import { addInvoice } from "../request";

export default function Form({ info, setSheetOpen }) {
  const { items: zustandItems } = useAppStore();
  const {
    clientAddress,
    senderAddress,
    clientEmail,
    clientName,
    paymentTerms,
    items,
    description,
    paymentDue,
    createdAt,
  } = info || {};
  const [sending, SetSending] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setInvoices } = useAppStore();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = { status: e.nativeEvent.submitter.id };
    formData.forEach((value, key) => {
      if (key === "quantity" || key === "price" || key === "paymentTerms") {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });
    result.items = zustandItems;
    const readyData = prepareData(result);
    SetSending(readyData);
  }

  useEffect(() => {
    if (sending) {
      setLoading(true);
      addInvoice(sending)
        .then((res) => {
          setInvoices([res]);
          console.log(res);
          setSheetOpen(false);
        })
        .catch(({ message }) => {
          console.log(message);
        })
        .finally(() => {
          setLoading(false);
          SetSending(null);
        });
    }
  }, [JSON.stringify(sending)]);
  return (
    <form onSubmit={handleSubmit} className="p-4 pt-14">
      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5">Bill From</h3>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="senderAddress-street">Street Address</Label>
            <Input
              type="text"
              defaultValue={info && senderAddress.street}
              id="senderAddress-street"
              name="senderAddress-street"
              placeholder="Street Address"
            />
          </div>
          <div className="flex justify-between gap-5">
            <div className="grid w-full max-w-full items-center gap-1.5">
              <Label htmlFor="senderAddress-city">City</Label>
              <Input
                type="text"
                defaultValue={info && senderAddress.city}
                id="senderAddress-city"
                name="senderAddress-city"
                placeholder="City"
              />
            </div>
            <div className="grid w-full max-w-full items-center gap-1.5">
              <Label htmlFor="senderAddress-postcode">Post Code</Label>
              <Input
                type="text"
                defaultValue={info && senderAddress.postCode}
                id="senderAddress-postcode"
                name="senderAddress-postcode"
                placeholder="Post Code"
              />
            </div>
            <div className="grid w-full max-w-full items-center gap-1.5">
              <Label htmlFor="senderAddress-country">Country</Label>
              <Input
                type="text"
                defaultValue={info && senderAddress.country}
                id="senderAddress-country"
                name="senderAddress-country"
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5">Bill To</h3>
        <div className="flex flex-col gap-5 mb-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientName">Client's Name</Label>
            <Input
              type="text"
              defaultValue={info && clientName}
              id="clientName"
              name="clientName"
              placeholder="Client's Name"
            />
          </div>
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientEmail">Client's Email</Label>
            <Input
              type="text"
              defaultValue={info && clientEmail}
              id="clientEmail"
              name="clientEmail"
              placeholder="Client's Email"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientAddress-street">Street Address</Label>
            <Input
              defaultValue={info && clientAddress.street}
              type="text"
              id="clientAddress-street"
              name="clientAddress-street"
              placeholder="Street Address"
            />
          </div>
          <div className="flex justify-between gap-5">
            <div className="grid w-full max-w-full items-center gap-1.5">
              <Label htmlFor="clientAddress-city">City</Label>
              <Input
                type="text"
                defaultValue={info && clientAddress.city}
                id="clientAddress-city"
                name="clientAddress-city"
                placeholder="City"
              />
            </div>
            <div className="grid w-full max-w-full items-center gap-1.5">
              <Label htmlFor="clientAddress-postcode">Post Code</Label>
              <Input
                type="text"
                defaultValue={info && clientAddress.postCode}
                id="clientAddress-postcode"
                name="clientAddress-postcode"
                placeholder="Post Code"
              />
            </div>
            <div className="grid w-full max-w-full items-center gap-1.5">
              <Label htmlFor="clientAddress-country">Country</Label>
              <Input
                type="text"
                defaultValue={info && clientAddress.country}
                id="clientAddress-country"
                name="clientAddress-country"
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mb-10">
        <div className="flex items-end gap-10">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="createdAt">Invoice Date</Label>
            <Input
              type="date"
              defaultValue={info && createdAt}
              id="createdAt"
              name="createdAt"
              placeholder="Invoice Date"
            />
          </div>
          <Select
            name="paymentTerms"
            defaultValue={info && paymentTerms.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1"> Net 1 Day</SelectItem>
                <SelectItem value="7"> Net 7 Days</SelectItem>
                <SelectItem value="14"> Net 14 Days</SelectItem>
                <SelectItem value="30"> Net 30 Days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-full items-center gap-1.5">
          <Label htmlFor="description">Project Description</Label>
          <Input
            type="text"
            defaultValue={info && description}
            id="description"
            name="description"
            placeholder="Project Description"
          />
        </div>
      </div>
      <ItemList info={info && info.items} />

      {info ? (
        <div className="flex justify-end gap-5 mt-10">
          <Button variant={"outline"}>Cancel</Button>
          <Button disabled={loading}>
            {loading ? "Loading..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div className="flex justify-end gap-5 mt-10">
          <Button type="button" variant={"outline"}>
            Discard
          </Button>
          <Button disabled={loading} id="draft" variant={"secondary"}>
            {loading ? "Loading..." : "Save as draft"}
          </Button>
          <Button disabled={loading} id="pending">
            {loading ? "Loading..." : "Save && Send"}
          </Button>
        </div>
      )}
    </form>
  );
}
