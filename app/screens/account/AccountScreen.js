/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import ShopIcon from '../../../assets/image/ic_shop.png';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import IconAvatar from '../../../assets/svg/ic_avatar.svg';
import {Fonts} from '../../utils/CommonStyles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AppConfig from '../../utils/AppConfig';
import AuthActions from '../../redux/auth/action';
const AccountScreen = props => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user) || null;
  console.log(user);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Header
        center={'Tài khoản'}
        left={
          <Image
            source={ShopIcon}
            style={{width: scale(42), height: scale(42)}}
          />
        }
      />
      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            alignItems: 'center',
            padding: scale(5),
          }}>
          <IconAvatar width={scale(90)} height={scale(90)} />
          <View style={{flex: 1}} />
          {user ? (
            <>
              <View>
                <Text
                  style={{
                    ...Fonts.defaultMedium,
                    fontSize: moderateScale(16),
                    color: '#000',
                  }}>
                  {user?.username}
                </Text>
                {/* <TouchableOpacity
                  style={{
                    backgroundColor: '#F20707',
                    width: scale(100),
                    alignItems: 'center',
                    paddingVertical: verticalScale(8),
                    marginRight: scale(15),
                    borderRadius: scale(4),
                    marginTop: verticalScale(10),
                  }}
                  onPress={() => {
                    navigation.navigate('Login');
                    dispatch({
                      type: AuthActions.SIGN_OUT,
                    });
                  }}>
                  <Text
                    style={{
                      ...Fonts.defaultMedium,
                      fontSize: moderateScale(12),
                      color: '#fff',
                    }}>
                    Đăng xuất
                  </Text>
                </TouchableOpacity> */}
              </View>

              <View style={{flex: 1}} />
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: '#000',
                  width: scale(100),
                  alignItems: 'center',
                  paddingVertical: verticalScale(8),
                  marginRight: scale(15),
                  borderRadius: scale(4),
                }}
                onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    ...Fonts.defaultMedium,
                    fontSize: moderateScale(12),
                    color: '#fff',
                  }}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F20707',
                  width: scale(100),
                  alignItems: 'center',
                  paddingVertical: verticalScale(8),
                  marginRight: scale(15),
                  borderRadius: scale(4),
                }}
                onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    ...Fonts.defaultMedium,
                    fontSize: moderateScale(12),
                    color: '#fff',
                  }}>
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#C9C5C5',
    paddingVertical: verticalScale(7),
  },
});
export default AccountScreen;
