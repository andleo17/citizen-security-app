import type { FormEvent } from "react";
import type { ReportCategory } from "vendor";

import TextAreaInput from "@/Components/Common/Forms/TextAreaInput";
import TextInput from "@/Components/Common/Forms/TextInput";
import { useForm } from "@inertiajs/react";
import { Button, Table } from "flowbite-react";

interface CategoryFormProps {
  category?: ReportCategory;
}

function useCategoryForm(category: ReportCategory) {
  const { data, setData, post, processing, errors, put } = useForm({
    name: category?.name || "",
    description: category?.description || "",
    subCategories: category?.sub_categories || [],
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (category) {
      put(route("admin.categories.update", { id: category.id }));
    } else {
      post(route("admin.categories.store"));
    }
  }

  function handleAddSubCategory() {
    setData("subCategories", [
      ...data.subCategories,
      {
        id: Date.now(),
        name: "",
        description: "",
        report_category_id: category.id,
      },
    ]);
  }

  function handleDeleteSubCategory(id: number) {
    setData(
      "subCategories",
      data.subCategories.filter((s: any) => s.id !== id)
    );
  }

  return {
    data,
    setData,
    processing,
    errors,
    handleSubmit,
    handleAddSubCategory,
    handleDeleteSubCategory,
  };
}

function CategoryForm({ category }: CategoryFormProps) {
  const {
    data,
    setData,
    processing,
    errors,
    handleSubmit,
    handleAddSubCategory,
    handleDeleteSubCategory,
  } = useCategoryForm(category);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextInput
        id="name"
        labelText="Nombre"
        placeholder="Ingrese el nombre de la categoría"
        value={data.name}
        onChange={(e) => setData("name", e.target.value)}
        errors={errors.name}
        required
      />
      <TextAreaInput
        id="description"
        labelText="Descripción"
        placeholder="Ingrese la descripción de la categoría"
        value={data.description}
        onChange={(e) => setData("description", e.target.value)}
        rows={5}
        errors={errors.description}
      />
      {category && (
        <Button onClick={handleAddSubCategory} color="success">
          Agregar subcategoría
        </Button>
      )}
      {data.subCategories.length > 0 && (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Descripción</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Eliminar</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.subCategories.map((s) => (
              <Table.Row
                key={s.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell
                  onBlur={(e) => {
                    const newSubcategory = [...data.subCategories];
                    const cell = newSubcategory.find(
                      (ss: any) => ss.id === s.id
                    );
                    cell.name = e.currentTarget.innerText;
                    setData("subCategories", newSubcategory);
                  }}
                  children={s.name}
                  contentEditable
                  suppressContentEditableWarning
                />
                <Table.Cell
                  onBlur={(e) => {
                    const newSubcategory = [...data.subCategories];
                    const cell = newSubcategory.find(
                      (ss: any) => ss.id === s.id
                    );
                    cell.description = e.currentTarget.innerText;
                    setData("subCategories", newSubcategory);
                  }}
                  children={s.description}
                  contentEditable
                  suppressContentEditableWarning
                />
                <Table.Cell>
                  <Button
                    color="failure"
                    onClick={() => handleDeleteSubCategory(s.id)}
                  >
                    Eliminar
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      <Button type="submit" disabled={processing}>
        Guardar
      </Button>
    </form>
  );
}

export default CategoryForm;
