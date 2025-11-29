import { PlusCircle } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router";
import { columns } from "~/components/columns/reportCategory-columns";
import { DataTable } from "~/components/custom-data-table/data-table";
import { DataTableSkeleton } from "~/components/route-components/datatableskeleton";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { getAllReportCategory } from "~/redux/features/reportSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

const Categories = () => {
  const token = "";
  const dispatch = useAppDispatch();
  const { loading, categoryData } = useAppSelector((state) => state.report);
  useEffect(() => {
    fetchProducts();
  }, [dispatch]);
  const fetchProducts = () => {
    dispatch(getAllReportCategory({ token }));
  };
  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Report-Category List</h1>
        <Button disabled>
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
        filterWith="email"
      />
    </div>
  );
};

export default Categories;
