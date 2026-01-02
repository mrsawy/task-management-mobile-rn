import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface PaginationDotsProps {
  currentIndex: number;
  totalPages: number;
  activeColor?: string;
  inactiveColor?: string;
  dotSize?: number;
  spacing?: number;
}

export function PaginationDots({
  currentIndex,
  totalPages,
  activeColor = '#000',
  inactiveColor = '#D1D5DB',
  dotSize = 8,
  spacing = 8,
}: PaginationDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPages }).map((_, index) => {
        const isActive = index === currentIndex;
        
        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: isActive ? activeColor : inactiveColor,
                marginHorizontal: spacing / 2,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    // Styles applied dynamically via props
  },
});

// ============================================
// ANIMATED VERSION (with smooth transitions)
// ============================================

interface AnimatedPaginationDotsProps extends PaginationDotsProps {
  scrollX?: Animated.Value; // For use with ScrollView/FlatList
}

export function AnimatedPaginationDots({
  currentIndex,
  totalPages,
  activeColor = '#000',
  inactiveColor = '#D1D5DB',
  dotSize = 8,
  spacing = 8,
}: AnimatedPaginationDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPages }).map((_, index) => {
        const isActive = index === currentIndex;
        
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: isActive ? dotSize * 2.5 : dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: isActive ? activeColor : inactiveColor,
                marginHorizontal: spacing / 2,
              },
            ]}
          />
        );
      })}
    </View>
  );
}