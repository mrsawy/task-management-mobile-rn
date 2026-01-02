import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { useUniwind } from 'uniwind';
import { THEME } from '@/src/lib/theme';
import { cn } from '@/src/lib/utils';

const RefreshableScrollView = ({
  children,
  className,
  onRefetch,
}: {
  children: React.ReactNode;
  className?: string;
  onRefetch?: () => Promise<any>;
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useUniwind();

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const state = await NetInfo.fetch();
      const isOnline = state.isConnected;

      if (!isOnline) {
        console.log('Offline → Skipping refetch, using cached data.');
        return; // ❗ Skip refetch
      }

      await onRefetch?.(); // Only refetch when online
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={THEME[theme || 'light'].primary}
          colors={[THEME[theme || 'light'].primary]}
        />
      }
      className={cn('flex-1')}
      showsVerticalScrollIndicator={false}
      contentContainerClassName={cn('bg-background ', className)}>
      {children}
    </ScrollView>
  );
};

export default RefreshableScrollView;
