function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  )
}

function TableHead({ children }) {
  return <thead className="bg-gray-50">{children}</thead>
}

function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
}

function TableRow({ children, className = '' }) {
  return <tr className={`hover:bg-gray-50 ${className}`}>{children}</tr>
}

function TableHeader({ children, className = '' }) {
  return <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${className}`}>{children}</th>
}

function TableCell({ children, className = '' }) {
  return <td className={`whitespace-nowrap px-6 py-4 text-sm text-gray-900 ${className}`}>{children}</td>
}

export { Table, TableHead, TableBody, TableRow, TableHeader, TableCell }
