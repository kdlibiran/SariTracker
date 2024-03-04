"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useEffect } from "react";
import ActionDropDown from "./ActionDropDown";
import { item } from "@/types/supabase";
import AddItemBtn from "./AddItemBtn";

export default function InventoryTable({
  data,
  owner,
  formAction,
}: {
  data: item[];
  owner: boolean;
  formAction: (formData: FormData) => Promise<any> | null;
}) {
  const [items, setItems] = useState<item[]>([]);
  const [name, setName] = useState<string>("");
  const getItems = async () => {
    if (name === "") {
      setItems(data);
    } else {
      setItems(data.filter((item) => item.name.toLowerCase().includes(name)));
    }
  };
  useEffect(() => {
    getItems();
  }, [name]);

  if (items && owner) {
    return (
      <div>
        <div className="flex flex-row gap-4">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Search"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <AddItemBtn formAction={formAction!} />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.sales}</TableCell>
                <TableCell>{row.expiry ?? "N/A"}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <ActionDropDown item={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } else if (items && !owner) {
    return (
      <div>
        <input
          type="text"
          className="my-2 w-full rounded-md border border-gray-300 p-2"
          placeholder="Search"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }
}
