import Heading from "@/components/dashboard/Heading";
import { Button } from "@/components/ui/button";
import CategoryDialog from "@/components/categories/CategoryDialog";
import CategoriesTable from "@/components/categories/categories-table";

export interface Category {
  name: string;
  imageUrl: string;
}

const CategoriesPage = () => {
  const data: Category[] = [
    {
      name: "Category-1",
      imageUrl: "img.url",
    },
    {
      name: "Category-2",
      imageUrl: "img.url",
    },
    {
      name: "Category-3",
      imageUrl: "img.url",
    },
    {
      name: "Category-4",
      imageUrl: "img.url",
    },
  ];
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
      <CategoriesTable data={data} />
    </>
  );
};

export default CategoriesPage;
