interface TodosTopProps {
  title: string;
  sortType: string;
  setSortType: (sort: string) => void;
}

export default function TodosTop({ title, sortType, setSortType }: TodosTopProps) {
  return (
    <div className="todos-header">
      <h2 id="currentCategoryTitle">{title}</h2>
      <div className="sort-controls">
        <label>Sort by:</label>
        <select 
            id="sortSelect" 
            value={sortType} 
            onChange={(e) => setSortType(e.target.value)}
        >
          <option value="created-desc">Created (Newest)</option>
          <option value="created-asc">Created (Oldest)</option>
          <option value="due-asc">Due Date (Soonest)</option>
          <option value="due-desc">Due Date (Latest)</option>
        </select>
      </div>
    </div>
  );
}

