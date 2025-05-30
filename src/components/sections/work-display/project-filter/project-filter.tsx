interface ProjectFilterProps {
  allTechnologies: string[];
  currentFilter: string | null;
  setFilter: (tech: string | null) => void;
  isDark: boolean;
}

export function ProjectFilter({
  allTechnologies,
  currentFilter,
  setFilter,
  isDark,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <FilterButton
        label="Todos"
        active={!currentFilter}
        onClick={() => setFilter(null)}
        isDark={isDark}
      />
      {allTechnologies.map((tech) => (
        <FilterButton
          key={tech}
          label={tech}
          active={currentFilter === tech}
          onClick={() => setFilter(tech)}
          isDark={isDark}
        />
      ))}
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
  isDark,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  isDark: boolean;
}) {
  const base =
    "cursor-pointer rounded-full px-5 py-2 border-2 text-sm font-semibold shadow-sm transition-all select-none";
  const styles = active
    ? "bg-blue-600 text-white border-blue-600"
    : isDark
    ? "bg-slate-800 text-blue-400 border-blue-300 hover:bg-slate-700"
    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100";

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {label}
    </button>
  );
}
