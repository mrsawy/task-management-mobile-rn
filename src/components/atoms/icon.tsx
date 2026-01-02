import { THEME } from '@/src/lib/theme';
import { cn } from '@/src/lib/utils';
import type { LucideIcon, LucideProps } from 'lucide-react-native';
import { useUniwind } from 'uniwind';

type IconProps = LucideProps & {
  as: LucideIcon;
  className?: string;
};

/**
 * A wrapper component for Lucide icons with Uniwind `className` support.
 *
 * This component allows you to render any Lucide icon while applying utility classes
 * using `uniwind`. It avoids the need to wrap or configure each icon individually.
 *
 * @component
 * @example
 * ```tsx
 * import { ArrowRight } from 'lucide-react-native';
 * import { Icon } from '@/components/atoms/icon';
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
  const { theme } = useUniwind();
  return (
    <IconComponent
      className={cn('text-foreground', className)}
      size={size}
      color={props.color ? props.color : THEME[theme || 'light'].primary}
      {...props}
    />
  );
}

export { Icon };
