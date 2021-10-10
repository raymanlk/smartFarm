import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Title, Caption, Paragraph, Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthenticationContext} from '../contexts';

export function DrawerContent(props) {
  const {onLogout, user} = useContext(AuthenticationContext);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={require('../../assets/images/user.png')}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{user?.firstName}</Title>
                <Caption style={styles.caption}>{user?.email}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph
                  style={[styles.paragraph, styles.caption]}></Paragraph>
                <Caption style={styles.caption}>Role:</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph
                  style={[styles.paragraph, styles.caption]}></Paragraph>
                <Caption style={styles.caption}>{user?.role}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="settings-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Ionicons name="lock-open-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={onLogout}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
