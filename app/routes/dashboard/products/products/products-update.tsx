import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
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
import { updateProduct } from "~/redux/features/productSlice";
import type { Product } from "~/redux/features/productSlice";

const ProductUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { product } = (location.state || {}) as { product: Product };

  const { loading, error } = useAppSelector((state) => state.product);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
    }
  }, [product]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category) {
      toast.error("Error", {
        description: "Name and Category are required.",
        position: "top-right",
        richColors: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("id", product.id.toString());
    formData.append("name", name);
    formData.append("category", category);
    if (image) {
      formData.append("imageUrl", image);
    }

    dispatch(updateProduct({ token: null, formPayload: formData }));
    navigate(-1);
  };

  if (!product) {
    return <div>No product data found for update.</div>;
  }

  return (
    <div className="form-container w-full max-w-2xl mx-auto text-black dark:text-white">
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Update Product</CardTitle>
            <CardDescription>
              Update the details for the product: {product.name}.
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
                Image (optional)
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
              {loading ? "Updating..." : "Update"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ProductUpdate;
