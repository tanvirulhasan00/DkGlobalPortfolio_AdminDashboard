import React, { useEffect, useState } from "react";
import { DataTable } from "~/components/custom-data-table/data-table";
import { DataTableSkeleton } from "~/components/route-components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { columns } from "~/components/columns/leadership-columns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { toast } from "sonner";
import { getAllLeadership } from "~/redux/features/leadershipSlice";

const Leadership = () => {
  const token = "";
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, error, refresh } = useAppSelector(
    (state) => state.leader
  );
  useEffect(() => {
    fetchProducts();
    setIsAttempted(false);
  }, [dispatch, refresh]);

  // toaster
  useEffect(() => {
    if (isAttempted) return;

    const ShowToast = data?.success ? toast.success : toast.error;
    ShowToast(data?.statusCode ?? data?.code, {
      description: data?.message,
      position: "top-right",
      richColors: true,
    });
  }, [refresh]);

  const fetchProducts = () => {
    dispatch(getAllLeadership({ token }));
  };

  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Leader List</h1>
        <h1>Add</h1>
      </div>
      <Separator className="mt-4" />
      <DataTable
        columns={columns}
        data={data?.result || []}
        filterWith="name"
      />
    </div>
  );
};

export default Leadership;
