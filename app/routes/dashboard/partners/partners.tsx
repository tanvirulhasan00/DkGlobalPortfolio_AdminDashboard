import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { columns } from "~/components/columns/partner-columns";
import { DataTable } from "~/components/custom-data-table/data-table";
import { DataTableSkeleton } from "~/components/route-components/datatableskeleton";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { getAllPartner } from "~/redux/features/partnerSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

const Partners = () => {
  const token = "";
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, error, refresh } = useAppSelector(
    (state) => state.partner
  );
  console.log("partners", data?.result);

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
    dispatch(getAllPartner({ token }));
  };

  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Partner List</h1>
        <Button>
          <Link to={"#"} className="flex gap-2 items-center">
            <PlusCircle />
            Add
          </Link>
        </Button>
      </div>
      <Separator className="mt-4" />
      <DataTable
        columns={columns}
        data={data?.result || []}
        filterWith="title"
      />
    </div>
  );
};

export default Partners;
