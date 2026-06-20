import { cn } from '../../lib/utils'

function Card({ className, children, ...props }) {
  return (
    <div className={cn('rounded-xl border border-gray-200 bg-white shadow-sm', className)} {...props}>
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }) {
  return <div className={cn('px-6 py-4 border-b border-gray-200', className)} {...props}>{children}</div>
}

function CardContent({ className, children, ...props }) {
  return <div className={cn('px-6 py-4', className)} {...props}>{children}</div>
}

export { Card, CardHeader, CardContent }
