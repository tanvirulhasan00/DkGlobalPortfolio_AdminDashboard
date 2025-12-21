import React, { useEffect, useState } from "react";
import { DataTable } from "~/components/custom-data-table/data-table";
import { DataTableSkeleton } from "~/components/route-components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { columns } from "~/components/columns/blog-category-columns";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { toast } from "sonner";
import { getAllCategories } from "~/redux/features/blogSlice";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { PlusCircle } from "lucide-react";
import { getToken } from "~/components/route-components/getLocalStorage";

const Categories = () => {
  const token = getToken();
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, categoryData, refresh } = useAppSelector(
    (state) => state.blog
  );
  console.log("categoryData", categoryData);

  useEffect(() => {
    fetchCategories();
    setIsAttempted(false);
  }, [dispatch, refresh]);

  // toaster
  useEffect(() => {
    if (isAttempted) return;

    const ShowToast = categoryData?.success ? toast.success : toast.error;
    if (categoryData?.message) {
      ShowToast(categoryData?.statusCode ?? categoryData?.message, {
        description: categoryData?.message,
        position: "top-right",
        richColors: true,
      });
    }
  }, [refresh, categoryData]);

  const fetchCategories = () => {
    dispatch(getAllCategories({ token: token || "" }));
  };

  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Blog Categories</h1>
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
