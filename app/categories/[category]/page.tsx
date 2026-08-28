import { notFound } from "next/navigation";

import CategoryPage from "@/sections/Categories/CategoryPage";

import {
  categoryPageSlugs,
  getCategoryPageData,
} from "@/sections/Categories/CategoryPage";

export function generateStaticParams() {
  return categoryPageSlugs.map(
    (category) => ({
      category,
    })
  );
}

export default async function CategoryRoute({
  params,
}: {
  params: Promise<{
    category: string;
  }>;
}) {
  const { category } = await params;

  const data =
    getCategoryPageData(category);

  if (!data) {
    notFound();
  }

  return (
    <CategoryPage data={data} />
  );
}