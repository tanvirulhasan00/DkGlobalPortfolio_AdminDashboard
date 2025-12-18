import React, { useEffect, useState } from "react";
import { DataTable } from "~/components/custom-data-table/data-table";
import { DataTableSkeleton } from "~/components/route-components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { columns } from "~/components/columns/blog-author-columns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { toast } from "sonner";
import { getAllAuthors } from "~/redux/features/blogSlice";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { PlusCircle } from "lucide-react";

const Authors = () => {
  const token = "";
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, data, error, refresh } = useAppSelector(
    (state) => state.blog
  );
  console.log("author", data);

  useEffect(() => {
    fetchAuthors();
    setIsAttempted(false);
  }, [dispatch, refresh]);

  // toaster
  useEffect(() => {
    if (isAttempted) return;

    const ShowToast = data?.success ? toast.success : toast.error;
    if (data?.message) {
      ShowToast(data?.statusCode ?? data?.message, {
        description: data?.message,
        position: "top-right",
        richColors: true,
      });
    }
  }, [refresh, data]);

  const fetchAuthors = () => {
    dispatch(getAllAuthors({ token }));
  };

  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Author List</h1>
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
        data={data?.result || []}
        filterWith="email"
      />
    </div>
  );
};

export default Authors;
