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

export default function InventoryTable({ data }: { data: any[] | null }) {
  const [items, setItems] = useState<any[] | null>([]);
  const getItems = async () => {
    setItems(data);
  };
  useEffect(() => {
    getItems();
  }, []);

  if (items) {
    return (
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
    );
  } else {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }
}
