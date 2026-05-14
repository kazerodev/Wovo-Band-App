import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '@/context/LanguageContext';
import { C } from '@/constants/colors';

export default function TabsLayout() {
  const { t } = useLang();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: C.bg2,
          borderTopColor: C.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: C.pri,
        tabBarInactiveTintColor: C.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
        headerStyle: { backgroundColor: C.bg2 },
        headerTintColor: C.text,
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab_home'),
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: t('tab_product'),
          tabBarIcon: ({ color, size }) => <Ionicons name="watch-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pricing"
        options={{
          title: t('tab_order'),
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t('tab_more'),
          tabBarIcon: ({ color, size }) => <Ionicons name="menu-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
