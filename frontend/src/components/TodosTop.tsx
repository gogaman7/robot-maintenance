import { COMPLETION_STATUS_OPTIONS, type CompletionStatusType } from '../constants/completionStatus';

interface TodosTopProps {
  title: string;
  completionStatus: CompletionStatusType;
  setCompletionStatus: (status: CompletionStatusType) => void;
  sortType: string;
  setSortType: (sort: string) => void;
}

export default function TodosTop({ title, completionStatus, setCompletionStatus, sortType, setSortType }: TodosTopProps) {
  return (
    <div className="todos-header">
      <h2 id="currentCategoryTitle">{title}</h2>
      <div className="sort-controls">
        <label>Completion status:</label>
        <select 
            id="completionStatusSelect" 
            value={completionStatus} 
            onChange={(e) => setCompletionStatus(e.target.value as CompletionStatusType)}
        >
          {COMPLETION_STATUS_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

