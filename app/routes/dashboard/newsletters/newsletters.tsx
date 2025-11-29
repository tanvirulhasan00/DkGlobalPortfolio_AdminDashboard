import React, { useEffect, useState } from "react";
import { columns } from "~/components/columns/newsletters-columns";
import { DataTable } from "~/components/custom-data-table/data-table";
import { DataTableSkeleton } from "~/components/route-components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { getAllNewsletters } from "~/redux/features/newslettersSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

const Newsletters = () => {
  const token = "";
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.newsletters);
  useEffect(() => {
    fetchProducts();
  }, [dispatch]);
  const fetchProducts = () => {
    dispatch(getAllNewsletters({ token }));
  };
  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Email list for newsletters</h1>
      </div>
      <Separator className="mt-4" />
      <DataTable
        columns={columns}
        data={data?.result || []}
        filterWith="email"
      />
    </div>
  );
};

export default Newsletters;
