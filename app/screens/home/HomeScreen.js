/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ListView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect} from 'react';
import {CommonColors, Fonts, ShadowStyle} from '../../utils/CommonStyles';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import CartIcon from '../../../assets/svg/home/ic_cart.svg';
import LaptopIcon from '../../../assets/svg/home/ic_laptop.svg';
import PCIcon from '../../../assets/svg/home/ic_pc.svg';
import ScreenIcon from '../../../assets/svg/home/ic_screen.svg';
import ChipIcon from '../../../assets/svg/home/ic_chip.svg';
import KeyboardIcon from '../../../assets/svg/home/ic_keyboard.svg';
import AccessoryIcon from '../../../assets/svg/home/ic_accessory.svg';
import AppleIcon from '../../../assets/svg/home/ic_apple.svg';
import GearIcon from '../../../assets/svg/home/ic_gear.svg';
import {ScrollView} from 'react-native-gesture-handler';
import PCImage from '../../../assets/image/home/image_pc.png';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/Header';
import ShopIcon from '../../../assets/image/ic_shop.png';
import CategoryActions from '../../redux/category/action';
import {useDispatch, useSelector} from 'react-redux';
import AppConfig from '../../utils/AppConfig';
import Cart from '../../component/Cart';
const HomeScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoryGraph =
    useSelector(state => state?.category?.categoryGraph) || [];

  useEffect(() => {
    dispatch({type: CategoryActions.GET_GRAPH_CATEGORY});
  }, []);
  const listItem = [
    {
      imageSource: PCImage,
      text: 'Laptop Gaming MSI Bravo 15 B5DD 276VN Radeon RX5500M Ryzen 5 ...',
      price: '14,790,000 đ',
    },
    {
      imageSource: PCImage,
      text: 'Laptop Gaming MSI Bravo 15 B5DD 276VN Radeon RX5500M Ryzen 5 ...',
      price: '14,790,000 đ',
    },
    {
      imageSource: PCImage,
      text: 'Laptop Gaming MSI Bravo 15 B5DD 276VN Radeon RX5500M Ryzen 5 ...',
      price: '14,790,000 đ',
    },
  ];
  const onPressBuyByCategory = item => {
    item &&
      navigation.push('ProductList', {
        title: item?.data?.name,
        id: item?.data?.id,
      });
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          ...ShadowStyle,
          padding: scale(8),
          width: scale(150),
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: scale(10),
        }}>
        <Image
          source={item?.imageSource}
          style={{
            width: scale(80),
            height: scale(60),
            resizeMode: 'contain',
          }}
        />
        <View>
          <Text
            numberOfLines={2}
            style={{
              ...Fonts.defaultRegular,
              fontSize: moderateScale(10),
              color: '#000',
              marginTop: verticalScale(3),
            }}>
            {item?.text}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.defaultMedium,
              fontSize: moderateScale(12),
              color: '#F20707',
              marginTop: verticalScale(3),
            }}>
            {item?.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        centerContainer={
          <View style={styles.wrapInput}>
            <TextInput placeholder="Tìm kiếm" style={styles.input} />
          </View>
        }
        left={
          <Image
            source={ShopIcon}
            style={{width: scale(42), height: scale(42)}}
          />
        }
        right={<Cart />}
      />

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.buyByCategory}>
          <Text style={styles.txtCategory}>Mua theo thể loại</Text>
          <View style={[styles.list, {marginBottom: verticalScale(30)}]}>
            <TouchableOpacity
              style={styles.boxItem}
              onPress={() => onPressBuyByCategory(categoryGraph?.[0])}>
              <View style={styles.itemIcon}>
                <LaptopIcon />
              </View>
              <Text style={styles.text}>Laptop</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxItem}
              onPress={() => onPressBuyByCategory(categoryGraph?.[1])}>
              <View style={styles.itemIcon}>
                <PCIcon />
              </View>
              <Text style={styles.text}>PC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxItem}
              onPress={() => onPressBuyByCategory(categoryGraph?.[2])}>
              <View style={styles.itemIcon}>
                <ScreenIcon />
              </View>
              <Text style={styles.text}>Màn hình</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxItem}
              onPress={() => onPressBuyByCategory(categoryGraph?.[3])}>
              <View style={styles.itemIcon}>
                <ChipIcon />
              </View>
              <Text style={styles.text}>Linh kiện</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.list, {marginBottom: verticalScale(20)}]}>
            <TouchableOpacity
              style={styles.boxItem}
              onPress={() => onPressBuyByCategory(categoryGraph?.[4])}>
              <View style={styles.itemIcon}>
                <KeyboardIcon />
              </View>
              <Text style={styles.text}>Gaming Gear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxItem}
              onPress={() => onPressBuyByCategory(categoryGraph?.[5])}>
              <View style={styles.itemIcon}>
                <AccessoryIcon />
              </View>
              <Text style={styles.text}>Phụ kiện</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxItem}
              onPress={() => onPressBuyByCategory(categoryGraph?.[6])}>
              <View style={styles.itemIcon}>
                <AppleIcon />
              </View>
              <Text style={styles.text}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxItem}
              onPress={() => onPressBuyByCategory(categoryGraph?.[7])}>
              <View style={styles.itemIcon}>
                <GearIcon />
              </View>
              <Text style={styles.text}>Gear Corner</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bestSeller}>
          <View style={styles.title}>
            <View style={styles.line} />
            <Text style={styles.txtTitle}>LAPTOP GAMING BEST-SELLER</Text>
            <View style={styles.line} />
          </View>
          <FlatList
            style={styles.listSeller}
            horizontal={true}
            data={listItem}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding: scale(7)}}
          />
        </View>
        <View style={styles.bestSeller}>
          <View style={styles.title}>
            <View style={styles.line} />
            <Text style={styles.txtTitle}>PC GAMING BEST-SELLER</Text>
            <View style={styles.line} />
          </View>
          <FlatList
            style={styles.listSeller}
            horizontal={true}
            data={listItem}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding: scale(7)}}
          />
        </View>
        <View style={styles.bestSeller}>
          <View style={styles.title}>
            <View style={styles.line} />
            <Text style={styles.txtTitle}>MÀN HÌNH GAMING</Text>
            <View style={styles.line} />
          </View>
          <FlatList
            style={styles.listSeller}
            horizontal={true}
            data={listItem}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding: scale(7)}}
          />
        </View>
        <View style={styles.bestSeller}>
          <View style={styles.title}>
            <View style={styles.line} />
            <Text style={styles.txtTitle}>GAMING GEAR</Text>
            <View style={styles.line} />
          </View>
          <FlatList
            style={styles.listSeller}
            horizontal={true}
            data={listItem}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding: scale(7)}}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: scale(50),
    height: scale(50),
  },
  input: {
    flex: 1,
    paddingLeft: scale(10),
    paddingRight: scale(25),
    color: '#757373',
    fontSize: moderateScale(12),
    backgroundColor: 'transparent',
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  wrapInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: verticalScale(17.5),
    borderWidth: scale(0.6),
    flex: 1,
    borderColor: '#707070',
    backgroundColor: '#D9D9D9',
    overflow: 'hidden',
    height: verticalScale(35),
    maxHeight: verticalScale(35),
    marginHorizontal: scale(15),
    paddingLeft: scale(5),
  },
  body: {
    flex: 1,
    backgroundColor: '#C2BBBB',
  },
  buyByCategory: {
    backgroundColor: '#fff',
    padding: scale(10),
    marginTop: verticalScale(7),
  },
  txtCategory: {
    fontSize: moderateScale(18),
    color: '#000',
  },
  list: {
    flexDirection: 'row',
    flex: 1,
    marginTop: verticalScale(16),
    paddingHorizontal: scale(16),
    justifyContent: 'space-between',
  },
  boxItem: {
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    width: scale(49),
    height: scale(49),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(24.5),
    backgroundColor: '#D9D9D9',
    marginBottom: scale(3),
  },
  text: {
    color: '#000',
    fontSize: moderateScale(14),
  },
  bestSeller: {
    backgroundColor: '#fff',
    marginTop: verticalScale(7),
    paddingBottom: verticalScale(10),
  },
  title: {
    backgroundColor: '#D7202C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(30),
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#fff',
  },
  txtTitle: {
    ...Fonts.defaultMedium,
    color: '#fff',
    fontSize: moderateScale(14),
    marginHorizontal: scale(3),
  },
  listSeller: {
    marginTop: verticalScale(10),
    // paddingVertical: verticalScale(10),
  },
});
export default HomeScreen;
