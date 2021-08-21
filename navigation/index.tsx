/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Icon } from "@ui-kitten/components";

import Colors from "../constants/Colors";
import PostScreen from "../screens/PostScreen";
import HomeScreen from "../screens/HomeScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SearchScreen from "../screens/SearchScreen";
import ListScreen from "../screens/ListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { View } from "react-native";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          contentStyle: {
            
          },
        }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors.tabIconSelected,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          height: 80,
          position: 'absolute'
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          tabBarIcon: ({ color, focused }) => (
            <TabBarEvaIcon
              name="grid-outline"
              color={color}
              selected={focused}
            />
          ),
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }: RootTabScreenProps<"Search">) => ({
          tabBarIcon: ({ color, focused }) => (
            <TabBarEvaIcon name="search" color={color} selected={focused} />
          ),
        })}
      />
      <BottomTab.Screen
        name="List"
        component={ListScreen}
        options={({ navigation }: RootTabScreenProps<"List">) => ({
          tabBarIcon: ({ color, focused }) => (
            <TabBarEvaIcon name="list" color={color} selected={focused} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          tabBarIcon: ({ color, focused }) => (
            <TabBarEvaIcon
              name="person-outline"
              color={color}
              selected={focused}
            />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarEvaIcon(props: {
  name: string;
  color: string;
  selected: boolean;
}) {
  const { selected, color, name } = props;
  return (
    <>
      <Icon
        style={{ width: 24, height: 24, marginBottom: -3 }}
        fill={color}
        name={name}
      />
      <TabBarDot color={Colors.tabFocusedDot} hidden={!selected} />
    </>
  );
}

function TabBarDot(props: { color: string; hidden: boolean }) {
  return (
    <View
      style={{
        marginTop: 10,
        width: 4,
        height: 4,
        borderRadius: 100 / 2,
        backgroundColor: props.color,
        opacity: props.hidden ? 0 : 1,
      }}
    />
  );
}
