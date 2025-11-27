import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "../ui/button";
import type { Partner } from "~/redux/features/partnerSlice";

export const columns: ColumnDef<Partner>[] = [
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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "link",
    header: "Web Link",
    cell: ({ row }) => <div className="capitalize">{row.getValue("link")}</div>,
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
      <div className="capitalize">
        {row.getValue("isActive") ? "Active" : "InActive"}
      </div>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex gap-4">
          <Link to={`update`} state={data}>
            <Button>Edit</Button>
          </Link>
        </div>
      );
    },
  },
];
