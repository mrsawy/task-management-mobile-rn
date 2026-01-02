import { cn } from '@/src/lib/utils';
import type { LucideIcon, LucideProps } from 'lucide-react-native';

type IconProps = LucideProps & {
  as: LucideIcon;
  className?: string;
};

/**
 * A wrapper component for Lucide icons with Uniwind `className` support.
 *
 * This component allows you to render any Lucide icon while applying utility classes
 * using `uniwind`.
 *
 * @component
 * @example
 * ```tsx
 * import { ArrowRight } from 'lucide-react-native';
 * import { Icon } from '@/components/ui/icon';
 *
 * <Icon as={ArrowRight} className="text-red-500" size={16} />
 * ```
 *
 * @param {LucideIcon} as - The Lucide icon component to render.
 * @param {string} className - Utility classes to style the icon using Uniwind.
 * @param {number} size - Icon size (defaults to 14).
 * @param {...LucideProps} ...props - Additional Lucide icon props passed to the "as" icon.
 */
function Icon({ as: IconComponent, className, size = 14, ...props }: IconProps) {
  return (
    <IconComponent
      className={cn('text-foreground', className)}
      size={size}
      {...props}
    />
  );
}

export { Icon };
