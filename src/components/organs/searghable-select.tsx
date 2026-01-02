import React, { useState, useCallback, useEffect } from 'react';
import { View, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Button } from '@/components/atoms/button';
import { Text } from '@/components/atoms/text';
import { Input } from '@/components/atoms/input';
import { Check, X } from 'lucide-react-native';
import { debounce } from 'lodash';

interface SearchableSelectProps {
  data: any[];
  value?: string;
  onSelect: (value: string) => void;
  onSearch: (query: string) => Promise<void>;
  placeholder?: string;
  searchPlaceholder?: string;
  labelKey?: string;
  valueKey?: string;
  loading?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  isLoading: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  data = [],
  value = 'Select Category',
  onSelect,
  onSearch,
  placeholder = 'Select an item',
  searchPlaceholder = 'Search...',
  labelKey = 'label',
  valueKey = 'value',
  loading = false,
  triggerClassName,
  contentClassName,
  isLoading = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Debounced search to avoid too many backend calls
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      await onSearch(query);
    }, 500),
    [onSearch]
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSelect = (item: any) => {
    onSelect(item[labelKey]);
    setOpen(false);
    // setSearchQuery('');
  };

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = item[valueKey] === value;

    return (
      <TouchableOpacity
        className="w-full border-b border-border px-4 py-3"
        onPress={() => handleSelect(item)}>
        <View className="w-full flex-row items-center justify-between">
          <Text className={isSelected ? 'font-semibold' : ''}>{item[labelKey]}</Text>
          {isSelected && <Check size={16} className="text-primary" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Button
        variant="outline"
        className={`justify-between ${triggerClassName}`}
        onPress={() => setOpen(true)}>
        <Text className={!value ? 'text-muted-foreground' : ''}>{value}</Text>
        <Text className="text-muted-foreground">▼</Text>
      </Button>

      <Modal
        visible={open}
        transparent
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={() => setOpen(false)}>
        <View className="flex-1 bg-black/50">
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={() => setOpen(false)} />

          <View className={`rounded-t-3xl bg-background pb-8 ${contentClassName}`}>
            {/* Header */}
            <View className="flex-row items-center justify-between border-b border-border px-6 py-4">
              <Text className="text-lg font-semibold">Select Item</Text>
              <TouchableOpacity onPress={() => setOpen(false)} className="p-2">
                <X size={20} className="text-muted-foreground" />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View className="px-6 pt-4">
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChangeText={handleSearchChange}
                autoFocus
                className="w-full"
              />
            </View>

            {/* List */}
            {loading ? (
              <View className="items-center py-8">
                <ActivityIndicator size="small" />
                <Text className="mt-2 text-muted-foreground">Loading...</Text>
              </View>
            ) : (
              <View style={{ height: 400 }} className="mx-4 mt-4">
                <FlashList
                  data={data}
                  renderItem={renderItem}
                  //   estimatedItemSize={50}
                  keyExtractor={(item) => item[valueKey]?.toString() || Math.random().toString()}
                  ListEmptyComponent={
                    <View className="items-center py-8">
                      {isLoading ? (
                        <>
                          <ActivityIndicator size={24} />
                        </>
                      ) : (
                        <Text className="text-muted-foreground">
                          {searchQuery ? 'No results found' : 'No items available'}
                        </Text>
                      )}
                    </View>
                  }
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SearchableSelect;

// ============================================
// USAGE EXAMPLE
// ============================================

/*
import React, { useState } from 'react';
import { View } from 'react-native';
import SearchableSelect from './SearchableSelect';

const MyScreen = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Make your backend API call here
      const response = await fetch(`https://api.example.com/search?q=${query}`);
      const results = await response.json();
      setData(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  React.useEffect(() => {
    handleSearch(''); // Load initial data
  }, []);

  return (
    <View className="p-4">
      <SearchableSelect
        data={data}
        value={selectedValue}
        onSelect={setSelectedValue}
        onSearch={handleSearch}
        placeholder="Select a user"
        searchPlaceholder="Search users..."
        loading={loading}
        labelKey="name"
        valueKey="id"
      />
    </View>
  );
};

export default MyScreen;
*/
