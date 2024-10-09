import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [T | null, (value: T | null) => void];

function useAsyncState<T>(initialValue: T | null = null): UseStateHook<T> {
    const [state, setState] = React.useState<T | null>(initialValue);

    const setAsyncState = (value: T | null) => {
        setState(value);
    };

    return [state, setAsyncState];
}

export async function setStorageItemAsync(key: string, value: string | null) {
    try {
        if (Platform.OS === 'web') {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } else {
            if (value === null) {
                await SecureStore.deleteItemAsync(key);
            } else {
                await SecureStore.setItemAsync(key, value);
            }
        }
    } catch (error) {
        console.error(`Error setting storage item for key "${key}":`, error);
    }
}

export function useStorageState(key: string): UseStateHook<string> {
    const [state, setState] = useAsyncState<string>();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const value = Platform.OS === 'web'
                    ? localStorage.getItem(key)
                    : await SecureStore.getItemAsync(key);
                setState(value);
            } catch (error) {
                console.error(`Error fetching storage item for key "${key}":`, error);
            }
        };

        fetchData();
    }, [key]);

    const setValue = React.useCallback(
        (value: string | null) => {
            setState(value);
            setStorageItemAsync(key, value);
        },
        [key]
    );

    return [state, setValue];
}
