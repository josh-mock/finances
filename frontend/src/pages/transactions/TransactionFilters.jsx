import { useState } from "react";

export default function TransactionFilters({
  columnFilters,
  handleFilterChange,
  accountOptions,
  categoryOptions,
  typeOptions,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <button
        className="form__button"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className={`filters ${!showFilters ? "filters--hidden" : ""}`}>
        <h2>Filters</h2>

        <div className="form__group">
          <h3>Date</h3>
          <div className="filters__range">
            <label className="form__label">
              <span>From:</span>
              <input
                type="date"
                className="form__input"
                value={
                  columnFilters.find((f) => f.id === "date")?.value?.min || ""
                }
                onChange={(e) =>
                  handleFilterChange("date", {
                    ...columnFilters.find((f) => f.id === "date")?.value,
                    min: e.target.value || undefined,
                  })
                }
              />
            </label>
            <label className="form__label">
              <span>To:</span>
              <input
                type="date"
                className="form__input"
                value={
                  columnFilters.find((f) => f.id === "date")?.value?.max || ""
                }
                onChange={(e) =>
                  handleFilterChange("date", {
                    ...columnFilters.find((f) => f.id === "date")?.value,
                    max: e.target.value || undefined,
                  })
                }
              />
            </label>
          </div>
        </div>

        <div className="form__group">
          <h3>Amount</h3>
          <div className="filters__range">
            <label className="form__label">
              <span>Min:</span>
              <input
                type="number"
                step="0.01"
                className="form__input"
                value={
                  columnFilters.find((f) => f.id === "amount")?.value?.min || ""
                }
                onChange={(e) =>
                  handleFilterChange("amount", {
                    ...columnFilters.find((f) => f.id === "amount")?.value,
                    min: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
              />
            </label>
            <label className="form__label">
              <span>Max:</span>
              <input
                type="number"
                step="0.01"
                className="form__input"
                value={
                  columnFilters.find((f) => f.id === "amount")?.value?.max || ""
                }
                onChange={(e) =>
                  handleFilterChange("amount", {
                    ...columnFilters.find((f) => f.id === "amount")?.value,
                    max: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
              />
            </label>
          </div>
        </div>

        <div className="form__group">
          <h3>Description</h3>
          <input
            type="text"
            className="form__input"
            value={
              columnFilters.find((f) => f.id === "description")?.value || ""
            }
            onChange={(e) => handleFilterChange("description", e.target.value)}
          />
        </div>

        <div className="form__group">
          <h3>Type</h3>
          <div className="filters__checkbox-group">
            {typeOptions.map((type) => {
              const values =
                columnFilters.find((f) => f.id === "type")?.value || [];
              return (
                <label key={type} className="form__checkbox">
                  <input
                    type="checkbox"
                    checked={values.includes(type)}
                    onChange={() =>
                      handleFilterChange(
                        "type",
                        values.includes(type)
                          ? values.filter((v) => v !== type)
                          : [...values, type]
                      )
                    }
                  />
                  {type}
                </label>
              );
            })}
          </div>
        </div>

        <div className="form__group">
          <h3>Account</h3>
          <div className="filters__checkbox-group">
            {accountOptions.map((account) => {
              const values =
                columnFilters.find((f) => f.id === "account_name")?.value || [];
              return (
                <label key={account} className="form__checkbox">
                  <input
                    type="checkbox"
                    checked={values.includes(account)}
                    onChange={() =>
                      handleFilterChange(
                        "account_name",
                        values.includes(account)
                          ? values.filter((v) => v !== account)
                          : [...values, account]
                      )
                    }
                  />
                  {account}
                </label>
              );
            })}
          </div>
        </div>

        <div className="form__group">
          <h3>Category</h3>
          <div className="filters__checkbox-group">
            {categoryOptions.map((category) => {
              const values =
                columnFilters.find((f) => f.id === "category")?.value || [];
              return (
                <label key={category} className="form__checkbox">
                  <input
                    type="checkbox"
                    checked={values.includes(category)}
                    onChange={() =>
                      handleFilterChange(
                        "category",
                        values.includes(category)
                          ? values.filter((v) => v !== category)
                          : [...values, category]
                      )
                    }
                  />
                  {category}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
