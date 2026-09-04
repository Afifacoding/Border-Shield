import Link from 'next/link'
import { Button } from '@/components/ui/button'

type LinkButtonProps = Omit<React.ComponentProps<typeof Button>, 'render' | 'nativeButton'> & {
  href: string
}

export function LinkButton({ href, ...props }: LinkButtonProps) {
  return <Button nativeButton={false} render={<Link href={href} />} {...props} />
}
