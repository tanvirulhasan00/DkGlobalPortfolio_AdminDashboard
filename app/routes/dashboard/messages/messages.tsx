import React, { useEffect } from "react";
import { columns } from "~/components/columns/messages-columns";
import { DataTable } from "~/components/custom-data-table/data-table";
import { DataTableSkeleton } from "~/components/route-components/datatableskeleton";
import { Separator } from "~/components/ui/separator";
import { getAllMessages } from "~/redux/features/messagesSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

const Messages = () => {
  const token = "";
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.messages);
  useEffect(() => {
    fetchProducts();
  }, [dispatch]);
  const fetchProducts = () => {
    dispatch(getAllMessages({ token }));
  };
  return loading ? (
    <DataTableSkeleton />
  ) : (
    <div className="w-full text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl ">Messages</h1>
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

export default Messages;
