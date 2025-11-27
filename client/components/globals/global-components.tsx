import { cn } from "@/lib/utils"

export const GlobalButton = ({
  children,
  onClick,
  disabled,
  className
}: {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  className?: string
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center text-white disabled:text-muted-foreground',
        'disabled:cursor-not-allowed',
        className,
        'transition duration-200 hover:text-primary/80 active:text-primary/70',
      )}
    >
      {children}
    </button>
  )
}
