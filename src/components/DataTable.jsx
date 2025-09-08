import React from 'react'
import clsx from 'clsx'

const DataTable = ({ data, columns, variant = 'default' }) => {
  const isBordered = variant === 'bordered'
  const isStriped = variant === 'striped'

  return (
    <div className="overflow-x-auto">
      <table className={clsx(
        'min-w-full',
        isBordered && 'border border-dark-border'
      )}>
        <thead className="bg-dark-bg">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={clsx(
                  'px-4 py-3 text-left text-xs font-medium text-dark-text-secondary uppercase tracking-wider',
                  isBordered && 'border-b border-dark-border'
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={clsx(
          isStriped && 'divide-y divide-dark-border'
        )}>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={clsx(
                'hover:bg-dark-bg transition-colors',
                isStriped && rowIndex % 2 === 0 && 'bg-dark-surface',
                isBordered && 'border-b border-dark-border'
              )}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-3 text-sm text-dark-text"
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable