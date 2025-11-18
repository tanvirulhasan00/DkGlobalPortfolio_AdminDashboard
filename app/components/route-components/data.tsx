import {
  User2Icon,
  AppWindow,
  Shirt,
  Factory,
  Proportions,
  MessageCircle,
  Newspaper,
  PersonStanding,
  BookOpen,
} from "lucide-react";

// export const baseUrl = "https://localhost:7274";
export const baseUrl = "https://portfolio.api.cookiesoftwareltd.com:4201";

export const NavMenu = [
  {
    title: "Preview",
    url: "/dashboard",
    icon: AppWindow,
  },
  {
    title: "Blogs",
    url: "/dashboard/blogs",
    icon: BookOpen,
    items: [
      {
        title: "Author",
        url: "/dashboard/blogs/authors",
      },
      {
        title: "Post",
        url: "/dashboard/blogs/posts",
      },
      {
        title: "Category",
        url: "/dashboard/blogs/categories",
      },
      {
        title: "Tags",
        url: "/dashboard/blogs/tags",
      },
      {
        title: "BlogPostTag",
        url: "/dashboard/blogs/blog-post-tags",
      },
    ],
  },
  {
    title: "Products",
    url: "#",
    icon: Shirt,
    items: [
      {
        title: "Products",
        url: "/dashboard/products",
      },
      {
        title: "Categories",
        url: "/dashboard/products/categories",
      },
      {
        title: "Images",
        url: "/dashboard/products/images",
      },
    ],
  },
  {
    title: "Company Profile",
    url: "#",
    icon: Factory,
    items: [
      {
        title: "Information",
        url: "/dashboard/company/profile-info",
      },
      {
        title: "Branches",
        url: "/dashboard/company/branches",
      },
      {
        title: "Bank Information",
        url: "/dashboard/company/bank-info",
      },
      {
        title: "Images",
        url: "/dashboard/company/images",
      },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: Proportions,
    items: [
      {
        title: "Reports",
        url: "/dashboard/reports",
      },
      {
        title: "Categories",
        url: "/dashboard/reports/categories",
      },
    ],
  },
  {
    title: "LeaderShip",
    url: "/dashboard/leader-ships",
    icon: User2Icon,
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageCircle,
  },
  {
    title: "Newsletters",
    url: "/dashboard/news-letters",
    icon: Newspaper,
  },
  {
    title: "Partners",
    url: "/dashboard/partners",
    icon: PersonStanding,
  },
];
export const User = {
  name: "user name",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};
