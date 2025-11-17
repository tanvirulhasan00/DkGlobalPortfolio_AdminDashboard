import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/root_route.tsx"),
  route("auth/login", "routes/auth/login.tsx"),
  route("dashboard", "routes/dashboard/dashboard.tsx", [
    index("routes/dashboard/dashboard-home.tsx"),
    ...prefix("company", [
      route(
        "profile-info",
        "routes/dashboard/company-info/company-information/company-info.tsx"
      ),
      route("branches", "routes/dashboard/company-info/branches/branches.tsx"),
      route(
        "bank-info",
        "routes/dashboard/company-info/bank-info/bank-info.tsx"
      ),
      route("images", "routes/dashboard/company-info/images/images.tsx"),
    ]),
    ...prefix("reports", [
      route("", "routes/dashboard/reports/reports.tsx"),
      route("categories", "routes/dashboard/reports/categories.tsx"),
    ]),
    ...prefix("products", [
      route("", "routes/dashboard/products/products/product.tsx"),
      route(
        "categories",
        "routes/dashboard/products/categories/categories.tsx"
      ),
      route("images", "routes/dashboard/products/images/images.tsx"),
    ]),
    ...prefix("blogs", [
      route("authors", "routes/dashboard/blogs/authors/authors.tsx"),
      route("posts", "routes/dashboard/blogs/posts/posts.tsx"),
      route("categories", "routes/dashboard/blogs/categories/categories.tsx"),
      route("tags", "routes/dashboard/blogs/tags/tags.tsx"),
      route(
        "blog-post-tags",
        "routes/dashboard/blogs/blog-post-tag/blog-post-tag.tsx"
      ),
    ]),
    route("leader-ships", "routes/dashboard/leadership/leadership.tsx"),
    route("messages", "routes/dashboard/messages/messages.tsx"),
    route("news-letters", "routes/dashboard/newsletters/newsletters.tsx"),
    route("partners", "routes/dashboard/partners/partners.tsx"),
  ]),
] satisfies RouteConfig;
