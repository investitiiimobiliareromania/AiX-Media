import React from 'react';

interface DataTableProps<T> {
  columns: { key: string; label: string; width?: string }[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

export function DataTable<T extends { id?: string }>({ columns, data, renderRow }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-muted/30 border-b border-border">
            {columns.map((col) => (
              <th 
                key={col.key} 
                className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item, index) => (
            <React.Fragment key={item.id || index}>
              {renderRow(item)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
