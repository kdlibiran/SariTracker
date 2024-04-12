import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { item } from "@/types/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "./ui/table";

export default function History({ item }: { item: item }) {
  return (
    <Dialog>
      <TableCell>
        <DialogTrigger className=" rounded-md font-bold hover:bg-gray-100">
          {item.name}
        </DialogTrigger>
      </TableCell>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{item.name} History</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quantity</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.sales}</TableCell>
                <TableCell>{item.expiry}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Tabs defaultValue="purchase" className="w-full mt-4">
            <TabsList className="border">
              <TabsTrigger
                value="purchase"
                className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-lg"
              >
                Purchases
              </TabsTrigger>
              <TabsTrigger
                value="sales"
                className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-lg"
              >
                Sales
              </TabsTrigger>
            </TabsList>
            <TabsContent value="purchase">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {item.purchaserecord.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>{purchase.date}</TableCell>
                      <TableCell>{purchase.quantity}</TableCell>
                      <TableCell>{purchase.expiry}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="sales">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {item.salesrecord.map((sales) => (
                    <TableRow key={sales.id}>
                      <TableCell>{sales.date}</TableCell>
                      <TableCell>{sales.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
