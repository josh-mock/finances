import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCategories } from "../../../api/categories";
import DeleteCategoryButton from "./DeleteCategoryButton";
import EditCategoryModal from "./EditCategoryModal";

export default function CategoriesTable() {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const [editingCategory, setEditingCategory] = useState(null);

  if (categories.length === 0) {
    return <div className="table__empty">No categories</div>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget item</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories
            .sort((a, b) => a.category.localeCompare(b.category))
            .map((category) => (
              <tr key={category.id}>
                <td>{category.category}</td>
                <td>{category.include_in_budget ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="table__button"
                    onClick={() => setEditingCategory(category)}
                  >
                    Edit
                  </button>
                  <DeleteCategoryButton id={category.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}
    </div>
  );
}
