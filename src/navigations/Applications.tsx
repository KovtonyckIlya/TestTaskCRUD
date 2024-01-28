import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Posts, PostDetails } from '@/screens';
import type { ApplicationStackParamList } from '@/types/navigations';
import React, { useEffect } from 'react';

const Stack = createStackNavigator<ApplicationStackParamList>();


function ApplicationNavigator() {

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={"PostsScreen"} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="PostsScreen" component={Posts} />
				<Stack.Screen name="PostDetailsScreen" component={PostDetails} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
