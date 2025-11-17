import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Link } from "react-router";
import { Checkbox } from "~/components/ui/checkbox";
import LeaderShipUpdate from "~/routes/dashboard/leadership/leadership-update";
import { Button } from "../ui/button";

export type Leadership = {
  id: number;
  name: string;
  designation: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  isActive: string;
};

export const columns: ColumnDef<Leadership>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("designation")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-15 h-14 rounded-2xl bg-amber-300">
        <img
          className="w-full h-full rounded-2xl"
          src={row.getValue("imageUrl")}
          alt="image"
        />
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("isActive")}</div>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      const [open, setOpen] = useState(false);

      return (
        <div className="flex gap-4">
          <Button onClick={() => setOpen(true)}>Edit</Button>
          <LeaderShipUpdate
            data={data}
            open={open}
            onClose={() => setOpen(false)}
          />
        </div>
      );
    },
  },
];
