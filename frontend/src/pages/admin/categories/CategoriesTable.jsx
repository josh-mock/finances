import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryButton from "./DeleteCategoryButton";
import { fetchCategories } from "../../../api/categories";

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories
            .sort((a, b) => a.category.localeCompare(b.category))
            .map((category) => (
              <tr key={category.id}>
                <td>{category.category}</td>
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
