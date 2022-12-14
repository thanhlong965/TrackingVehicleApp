/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import {CommonColors, Fonts} from '../../utils/CommonStyles';
import LaptopAcerImage from '../../../assets/image/product/Laptop_Acer.png';
import LaptopAcerImage1 from '../../../assets/image/product/Laptop_Acer_1.png';
import LaptopAcerImage2 from '../../../assets/image/product/Laptop_Acer_2.png';
import LaptopAcerImage3 from '../../../assets/image/product/Laptop_Acer_3.png';
import LaptopAcerImage4 from '../../../assets/image/product/Laptop_Acer_4.png';
import IconAddCart from '../../../assets/svg/ic_add_cart.svg';
import {useState} from 'react';
import Utils from '../../utils/Utils';
import {useDispatch} from 'react-redux';
import CartActions from '../../redux/cart/action';
import VccLoading from '../../component/VccLoading';
import Cart from '../../component/Cart';
import AppConfig from '../../utils/AppConfig';
import {useNavigation} from '@react-navigation/native';
const ProductDetailScreen = props => {
  const {item} = props.route.params;
  const [loading, showLoading] = useState(false);
  const listSlide = [
    LaptopAcerImage,
    LaptopAcerImage1,
    LaptopAcerImage2,
    LaptopAcerImage3,
  ];
  const [indexImage, setIndexImage] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleAddToCart = () => {
    if (AppConfig.ACCESS_TOKEN) {
      showLoading(true);
      dispatch({
        type: CartActions.ADD_TO_CART,
        data: {
          productId: item?.id,
          quantity: 1,
        },
        onSuccess: () => {
          showLoading(false);
          Utils.showSuccessToast({text1: 'Thêm vào giỏ hàng thành công'});
        },
        onFailed: () => {
          showLoading(false);
          Utils.showErrorToast({
            text1: 'Thêm vào giỏ hàng thất bại. Vui lòng thử lại sau',
          });
        },
      });
    } else {
      navigation.navigate('Login', {
        callback: () => {},
      });
    }
  };
  const handleBuyNow = () => {
    if (AppConfig.ACCESS_TOKEN) {
      showLoading(true);
      console.log(item);
      dispatch({
        type: CartActions.ADD_TO_CART,
        data: {
          productId: item?.id,
          quantity: 1,
        },
        onSuccess: () => {
          showLoading(false);
          navigation.navigate('Cart', {
            checkId: item?.id,
          });
          // Utils.showSuccessToast({text1: 'Thêm vào giỏ hàng thành công'});
        },
        onFailed: () => {
          showLoading(false);
          Utils.showErrorToast({
            text1: 'Có lỗi. Vui lòng thử lại sau',
          });
        },
      });
    } else {
      navigation.navigate('Login', {
        callback: () => {},
      });
    }
  };
  const renderImageItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          marginRight: index != listSlide.length - 1 ? scale(20) : 0,

          width: scale(70),
          height: scale(70),
          borderRadius: scale(3),
          borderWidth: 0.2,
          padding: scale(4),
        }}
        onPress={() => setIndexImage(index)}>
        <Image style={{width: '100%', height: '100%'}} source={item} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Header center={'Sản phẩm'} left={<BackButton />} right={<Cart />} />
      <ScrollView style={styles.body}>
        <Text style={styles.textProductName}>{item?.name}</Text>
        <View
          style={{
            marginTop: verticalScale(30),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={listSlide[indexImage]}
            style={{
              width: scale(250),
              height: verticalScale(180),
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{height: verticalScale(150)}}>
          <FlatList
            horizontal={true}
            style={styles.listImageSlide}
            data={listSlide}
            renderItem={renderImageItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding: scale(7)}}
          />
        </View>

        <View style={styles.buyNow}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: verticalScale(9),
              opacity: 1,
            }}>
            <Text
              style={{
                marginBottom: verticalScale(10),
                ...Fonts.defaultRegular,
                fontSize: moderateScale(12),
                color: '#000',
              }}>
              Mua ngay
            </Text>
            <Text
              style={{
                marginBottom: verticalScale(10),
                ...Fonts.defaultBold,
                fontSize: moderateScale(14),
                color: '#E50000',
              }}>
              {Utils.formatPrice(item?.price)}
            </Text>
          </View>
          <Text
            style={{
              ...Fonts.defaultRegular,
              color: '#000',
              fontSize: moderateScale(12),
              marginHorizontal: scale(30),
            }}>
            Hoặc
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: verticalScale(9),
            }}>
            <Text
              style={{
                marginBottom: verticalScale(10),
                ...Fonts.defaultRegular,
                fontSize: moderateScale(12),
                color: '#000',
              }}>
              Trả trước từ
            </Text>
            <Text
              style={{
                marginBottom: verticalScale(10),
                ...Fonts.defaultBold,
                fontSize: moderateScale(14),
                color: '#E50000',
              }}>
              {Utils.formatPrice(item?.price / 10)}
            </Text>
          </View>
        </View>
        <View style={styles.specification}>
          <Text
            style={{
              ...Fonts.defaultBold,
              fontSize: moderateScale(16),
              color: '#000',
              textTransform: 'uppercase',
            }}>
            {' '}
            Thông số kỹ thuật
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buyNowModal}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{alignItems: 'center', padding: scale(10)}}
            onPress={handleAddToCart}>
            <IconAddCart width={scale(25)} height={scale(25)} />
            <Text style={{...Fonts.defaultRegular, color: '#000'}}>
              Thêm vào giỏ hàng
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: '100%',
            width: 1,
            backgroundColor: '#000',
            opacity: 0.4,
          }}
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              width: scale(120),
              height: verticalScale(40),
              backgroundColor: '#F20707',
              borderRadius: scale(10),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleBuyNow}>
            <Text
              style={{
                ...Fonts.defaultRegular,
                fontSize: scale(14),
                color: '#fff',
              }}>
              Mua ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <VccLoading />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(15),
  },
  textProductName: {
    ...Fonts.defaultMedium,
    fontSize: moderateScale(14),
    color: '#000',
    lineHeight: verticalScale(25),
    textAlign: 'center',
    marginTop: scale(15),
  },
  listImageSlide: {
    paddingVertical: verticalScale(30),
  },
  buyNow: {
    backgroundColor: '#D9D9D947',
    borderRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  specification: {
    marginTop: verticalScale(20),
    borderRadius: scale(10),
    borderWidth: 1,
    height: verticalScale(200),
    padding: scale(10),
  },
  buyNowModal: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: scale(5),
    height: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(5),
  },
});
export default ProductDetailScreen;
