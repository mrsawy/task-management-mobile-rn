import { View } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BookOpen, Home, Heart, Settings, Wallet, SearchIcon } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/src/lib/utils';
import { MotiView } from 'moti';
import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useUniwind } from 'uniwind';
import { THEME } from '@/src/lib/theme';

// Icon mapping - adjust based on your route names
const iconMap: Record<string, any> = {
  index: Home,
  'my-courses': BookOpen,
  browse: SearchIcon, // or Search icon
  wallet: Wallet,
  settings: Settings,
  // favorites: Heart,
};

const TabBarButton = ({ route, isFocused, options, onPress, onLongPress, buildHref }: any) => {
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name;

  const IconComponent = iconMap[route.name] || Home;

  // Animated values
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isFocused) {
      scale.value = withSpring(1.2, {
        damping: 20, // ⚡ LOWER = faster/bouncier (try 8-15)
        stiffness: 350, // ⚡ HIGHER = faster response (try 100-300)
      });
      translateY.value = withSpring(-20, {
        damping: 20, // ⚡ Controls bounce speed
        stiffness: 350, // ⚡ Controls movement speed
      });
    } else {
      scale.value = withSpring(1, {
        damping: 20,
        stiffness: 350,
      });
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 350,
      });
    }
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    borderWidth: 0,
  }));

  const { theme } = useUniwind();
  const isDarkMode = theme === 'dark';

  return (
    <PlatformPressable
      href={buildHref(route.name, route.params)}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarButtonTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 3 }}>
      <Animated.View style={animatedStyle}>
        <MotiView
          style={{
            borderWidth: 0,
          }}
          animate={{
            scale: isFocused ? 1 : 0.9,
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}>
          <View
            className={cn(
              'items-center justify-center p-1',
              isFocused &&
              'rounded-full border-[5px] border-background bg-primary p-2 outline-none outline-0'
            )}>
            <MotiView
              animate={{
                rotate: isFocused ? '0deg' : '0deg',
              }}
              transition={{
                type: 'timing',
                duration: 200,
              }}>
              <IconComponent
                size={30}
                strokeWidth={isFocused ? 3 : 2}
                className={cn('text-background')}
                color={THEME.dark.primaryForeground}
              />
            </MotiView>
          </View>
        </MotiView>
      </Animated.View>

      <MotiView
        animate={{
          opacity: isFocused ? 1 : 0.7,
          scale: isFocused ? 1 : 0.95,
          translateY: isFocused ? -15 : 0,
        }}
        transition={{
          type: 'timing',
          duration: 100,
        }}>
        <Text
          className={cn(
            'mt-1 text-xs font-extrabold',
            isFocused ? 'font-extrabold' : 'text-muted-foreground',
            isDarkMode && 'text-background'
          )}>
          {label}
        </Text>
      </MotiView>
    </PlatformPressable>
  );
};

export default function TabBar({ state, descriptors, navigation }: any) {
  const { buildHref } = useLinkBuilder();

  return (
    <View className="absolute bottom-0 left-0 right-0 px-1">
      <View
        className={cn(
          'flex-row items-center justify-around rounded-t-[50px] bg-primary px-4 pb-1 shadow-md backdrop-blur-xl'
        )}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabBarButton
              key={route.key}
              route={route}
              isFocused={isFocused}
              options={options}
              onPress={onPress}
              onLongPress={onLongPress}
              buildHref={buildHref}
            />
          );
        })}
      </View>
    </View>
  );
}
// import { View } from 'react-native';
// import { useLinkBuilder, useTheme } from '@react-navigation/native';
// import { PlatformPressable } from '@react-navigation/elements';
// import { BookOpen, Home, Heart, Settings } from 'lucide-react-native';
// import { Text } from '@/components/ui/text';
// import { cn } from '@/lib/utils';

// // Icon mapping - adjust based on your route names
// const iconMap: Record<string, any> = {
//   index: Home,
//   'my-courses': BookOpen,
//   browse: Heart, // or Search icon
//   settings: Settings,
// };

// export default function TabBar({ state, descriptors, navigation }: any) {
//   const { colors } = useTheme();
//   const { buildHref } = useLinkBuilder();

//   return (
//     <View className="absolute bottom-0 left-0 right-0 px-1">
//       <View
//         className={cn(
//           'flex-row items-center justify-around rounded-t-[50px] bg-primary px-4 pb-4 pt-1 shadow-md backdrop-blur-xl'
//         )}>
//         {state.routes.map((route: any, index: any) => {
//           const { options } = descriptors[route.key];
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//                 ? options.title
//                 : route.name;

//           const isFocused = state.index === index;

//           // Get the icon component
//           const IconComponent = iconMap[route.name] || Home;

//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name, route.params);
//             }
//           };

//           const onLongPress = () => {
//             navigation.emit({
//               type: 'tabLongPress',
//               target: route.key,
//             });
//           };

//           return (
//             <PlatformPressable
//               key={route.key}
//               href={buildHref(route.name, route.params)}
//               accessibilityRole="button"
//               accessibilityState={isFocused ? { selected: true } : {}}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarButtonTestID}
//               onPress={onPress}
//               onLongPress={onLongPress}
//               className="flex-1 items-center justify-center py-2">
//               <View
//                 className={cn(
//                   'items-center justify-center p-3',
//                   isFocused && 'rounded-full border-[5px] border-white bg-primary'
//                 )}>
//                 <IconComponent
//                   size={30}
//                   strokeWidth={isFocused ? 3.5 : 2}
//                 />
//               </View>
//               <Text
//                 className={cn(
//                   'mt-1 text-xs font-extrabold',
//                   isFocused ? 'font-extrabold' : 'text-muted-foreground'
//                 )}>
//                 {label}
//               </Text>
//             </PlatformPressable>
//           );
//         })}
//       </View>
//     </View>
//   );
// }
