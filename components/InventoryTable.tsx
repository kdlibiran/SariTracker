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

export default function InventoryTable({ data }: { data: any[] | null }) {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow className="flex flex-row text-center">
            <TableHeader>Name</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Price</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
