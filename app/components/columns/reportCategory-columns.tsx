import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "../ui/button";
import type { ReportCategory } from "~/redux/features/reportSlice";

export const columns: ColumnDef<ReportCategory>[] = [
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
    header: "Title",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "icon",
    header: "Icon Text",
    cell: ({ row }) => <div className="capitalize">{row.getValue("icon")}</div>,
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => <div className="capitalize">{row.getValue("link")}</div>,
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
