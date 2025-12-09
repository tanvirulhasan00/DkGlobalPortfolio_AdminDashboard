import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { createProduct } from "~/redux/features/productSlice";

const ProductCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.product);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !image) {
      toast.error("Error", {
        description: "All fields are required.",
        position: "top-right",
        richColors: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    if (image) {
      formData.append("imageUrl", image);
    }

    dispatch(createProduct({ token: null, formPayload: formData }));
    navigate(-1);
  };

  return (
    <div className="form-container w-full max-w-2xl mx-auto text-black dark:text-white">
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create Product</CardTitle>
            <CardDescription>
              Fill in the details below to create a new product.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="form-item" style={{ animationDelay: "0.1s" }}>
              <Label className="mb-2" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>
            <div className="form-item" style={{ animationDelay: "0.2s" }}>
              <Label className="mb-2" htmlFor="category">
                Category
              </Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter product category"
              />
            </div>
            <div className="form-item" style={{ animationDelay: "0.3s" }}>
              <Label className="mb-2" htmlFor="image">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/dashboard/products">Back</Link>
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="form-item"
              style={{ animationDelay: "0.4s" }}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ProductCreate;
