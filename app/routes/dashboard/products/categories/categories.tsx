import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { columns } from "~/components/columns/product-category-columns";
import { DataTable } from "~/components/custom-data-table/data-table";
import { DataTableSkeleton } from "~/components/route-components/datatableskeleton";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { getAllProductCat } from "~/redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

const Categories = () => {
  const token = "";
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, categoryData, error, refresh } = useAppSelector(
    (state) => state.product
  );
  console.log("product data", categoryData?.result);

  useEffect(() => {
    fetchProducts();
    setIsAttempted(false);
  }, [dispatch, refresh]);

  // toaster
  useEffect(() => {
    if (isAttempted) return;

    const ShowToast = categoryData?.success ? toast.success : toast.error;
    ShowToast(categoryData?.statusCode, {
      description: categoryData?.message,
      position: "top-right",
      richColors: true,
    });
  }, [refresh]);

  const fetchProducts = () => {
    dispatch(getAllProductCat({ token }));
  };

  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Product List</h1>
        <Button>
          <Link to={"add"} className="flex gap-2 items-center">
            <PlusCircle />
            Add
          </Link>
        </Button>
      </div>
      <Separator className="mt-4" />
      <DataTable
        columns={columns}
        data={categoryData?.result || []}
        filterWith="name"
      />
    </div>
  );
};

export default Categories;
