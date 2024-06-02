import Heading from "@/components/dashboard/Heading";
import { Button } from "@/components/ui/button";
import CategoryDialog from "@/components/categories/CategoryDialog";
import CategoriesTable from "@/components/categories/categories-table";
import type { Category } from "@/types";
import { api } from "@/trpc/server";

const CategoriesPage = async () => {
  const categories = await api.category.getallCategories();
  return (
    <>
      <Heading
        title="Categories"
        description="all categories are listed below"
      />
      <CategoryDialog
        trigger={<Button className="self-end">Create Category</Button>}
        initialData={null}
      />
      <CategoriesTable data={categories as Category[]} />
    </>
  );
};

export default CategoriesPage;
