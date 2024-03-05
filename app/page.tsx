import NavBar from "@/components/NavBar";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import GoogleMaps from "@/components/GoogleMaps";
import StoreMap from "@/components/StoreMap";
import { item, store } from "@/types/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchStore from "@/components/SearchStore";

export default async function Index() {
  const supabase = createClient();

  const { data: stores, error: storeError } = await supabase
    .from("stores")
    .select("*");
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("user_id", user?.id);
    const lowStock = data
      ?.filter((item: item) => item.quantity >= 0)
      .sort((a: item, b: item) => a.quantity - b.quantity)
      .slice(0, 8);
    const nearExpiry = data
      ?.filter((item: item) => item.expiry !== null)
      .sort((a: item, b: item) => a.expiry!.localeCompare(b.expiry!))
      .slice(0, 8);
    const topSales = data
      ?.filter((item: item) => item.sales > 0)
      .sort((a: item, b: item) => b.sales - a.sales)
      .slice(0, 8);

    return (
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <NavBar />
        <div className="flex w-max flex-col gap-4 md:flex-row">
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle>Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStock?.map((item: item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle>Near Expiry</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nearExpiry?.map((item: item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-center">
                        {item.expiry}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle>Top Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSales?.map((item: item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-center">
                        {item.sales}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full flex-1 flex-col items-center">
        <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
          <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
            SariTracker
            <AuthButton />
          </div>
        </nav>
        <div className="flex w-full flex-1 flex-row items-center justify-center">
          <div>
            <div className="w-4/5 text-5xl">Find a store near you</div>
            <div className="w-2/3 text-xl">Just click on the red marker</div>
          </div>
          <SearchStore data={stores as store[]} />
        </div>
      </div>
    );
  }
}
