import { View, Text } from 'react-native';
import React from 'react';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { Uniwind, useUniwind } from 'uniwind';
import { Button } from '../atoms/button';
import { Icon } from '../atoms/icon';
import { cn } from '@/src/lib/utils';

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle({ className }: { className?: string }) {
  const { theme } = useUniwind();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    Uniwind.setTheme(newTheme);
  };

  return (
    <Button
      onPress={toggleTheme}
      size="icon"
      variant="ghost"
      className={cn('ios:size-9 rounded-full web:mx-4', className)}>
      <Icon as={THEME_ICONS[theme ?? 'light']} className="size-5" />
    </Button>
  );
}
export default ThemeToggle;
