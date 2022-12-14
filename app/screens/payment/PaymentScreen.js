/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import AddressIcon from '../../../assets/svg/ic_address.svg';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import {Fonts} from '../../utils/CommonStyles';
import EditIcon from '../../../assets/svg/ic_edit.svg';
import DeleteIcon from '../../../assets/svg/ic_delete_cart.svg';
import ClockIcon from '../../../assets/svg/ic_clock.svg';
import LaptopAcerImage from '../../../assets/image/product/Laptop_Acer.png';
import Utils from '../../utils/Utils';
import {ScrollView} from 'react-native-gesture-handler';
import IconCheck from '../../../assets/svg/ic_check.svg';
import CurrencyIcon from '../../../assets/svg/ic_currency.svg';
import {useDispatch} from 'react-redux';
import OrderActions from '../../redux/order/action';
import {useNavigation} from '@react-navigation/native';
import CartActions from '../../redux/cart/action';

const PaymentScreen = props => {
  const {listProduct} = props?.route?.params;
  const [timeReceive, setTimeReceive] = useState(0);
  const [paymentType, setPaymentType] = useState(0);
  const transportFee = 15000;
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    let newTotal = 0;
    listProduct.map(item => {
      newTotal += item?.price * item?.quantity;
    });
    setTotal(newTotal);
  }, [listProduct]);
  const handleSubmit = () => {
    console.log(listProduct);
    dispatch({
      type: OrderActions.ADD_ORDER,
      data: listProduct,
      onSuccess: () => {
        navigation.navigate('Main');
        Utils.showSuccessToast({text1: 'Bạn đã thêm đơn hàng thành công'});
      },
    });
  };
  const renderProductItem = ({item, index}) => {
    return (
      <View
        style={{
          paddingTop: verticalScale(10),
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#9D9393',
          paddingBottom: verticalScale(10),
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{
              width: scale(105),
              height: verticalScale(80),
              marginBottom: verticalScale(20),
            }}
            source={
              item?.avtImageUrl != 'None' && item?.avtImageUrl
                ? {uri: item?.avtImageUrl}
                : LaptopAcerImage
            }
          />
          <Text
            style={{
              ...Fonts.defaultRegular,
              color: '#F20707',
              fontSize: moderateScale(12),
              lineHeight: verticalScale(16),
            }}>
            {Utils.formatPrice(item?.price)}
          </Text>
        </View>
        <View
          style={{
            marginLeft: scale(23),
            flex: 1,
          }}>
          <Text
            style={{
              ...Fonts.defaultRegular,
              color: '#000',
              fontSize: moderateScale(12),
              lineHeight: verticalScale(16),
              flex: 1,
            }}
            numberOfLines={4}>
            {item?.productName}
          </Text>
          <View>
            <Text
              style={{
                ...Fonts.defaultRegular,
                color: '#000',
                fontSize: moderateScale(14),
                lineHeight: verticalScale(16),
              }}>{`Số lượng:  ${item?.quantity}`}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.containter}>
      <Header center={'Thanh toán'} left={<BackButton />} />
      <ScrollView
        style={styles.body}
        contentContainerStyle={{paddingVertical: verticalScale(10)}}>
        <View style={styles.addressBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AddressIcon width={scale(16)} height={verticalScale(20)} />
            <Text
              style={{
                ...Fonts.defaultRegular,
                fontSize: moderateScale(14),
                color: '#000',
                marginLeft: scale(10),
              }}>
              Địa chỉ nhận hàng
            </Text>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={{
                width: scale(130),
                height: verticalScale(30),
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.5,
                borderColor: '#000',
              }}>
              <Text
                style={{
                  ...Fonts.defaultRegular,
                  fontSize: moderateScale(14),
                  color: '#000',
                }}>
                + Thêm mới
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: '#9D9393',
              marginVertical: verticalScale(10),
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '70%'}}>
              <Text style={styles.text}>Long</Text>
              <Text style={styles.text}>0796823436</Text>
              <Text style={styles.text}>Long 0796823436</Text>
            </View>
            <View style={{flex: 1}} />
            <TouchableOpacity style={{marginRight: scale(15)}}>
              <EditIcon color="#707070" width={scale(20)} height={scale(20)} />
            </TouchableOpacity>
            <TouchableOpacity>
              <DeleteIcon width={scale(20)} height={scale(20)} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={styles.productBox}
          data={listProduct}
          renderItem={renderProductItem}
          contentContainerStyle={{paddingVertical: verticalScale(10)}}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.timeReceive}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ClockIcon />
              <Text style={[styles.text, {marginLeft: scale(8)}]}>
                Thời gian nhận hàng
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#9D9393',
                marginTop: verticalScale(12),
              }}
            />
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setTimeReceive(0)}>
              {timeReceive === 0 ? (
                <IconCheck width={scale(15)} height={scale(12)} />
              ) : (
                <View style={{width: scale(15)}} />
              )}

              <Text
                style={[
                  styles.text,
                  {marginLeft: scale(15), paddingVertical: verticalScale(4)},
                ]}>
                Tất cả các ngày trong tuần
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setTimeReceive(1)}>
              {timeReceive === 1 ? (
                <IconCheck width={scale(15)} height={scale(12)} />
              ) : (
                <View style={{width: scale(15)}} />
              )}
              <Text
                style={[
                  styles.text,
                  {marginLeft: scale(15), paddingVertical: verticalScale(4)},
                ]}>
                Chỉ giao giờ hành chính
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.paymentType}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CurrencyIcon width={scale(20)} height={scale(20)} />
              <Text style={[styles.text, {marginLeft: scale(8)}]}>
                Phương thức thanh toán
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#9D9393',
                marginTop: verticalScale(12),
              }}
            />
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setPaymentType(0)}>
              {paymentType === 0 ? (
                <IconCheck width={scale(15)} height={scale(12)} />
              ) : (
                <View style={{width: scale(15)}} />
              )}

              <Text
                style={[
                  styles.text,
                  {marginLeft: scale(15), paddingVertical: verticalScale(4)},
                ]}>
                Thanh toán qua thẻ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setPaymentType(1)}>
              {paymentType === 1 ? (
                <IconCheck width={scale(15)} height={scale(12)} />
              ) : (
                <View style={{width: scale(15)}} />
              )}
              <Text
                style={[
                  styles.text,
                  {marginLeft: scale(15), paddingVertical: verticalScale(4)},
                ]}>
                Thanh toán khi nhận hàng (COD)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setPaymentType(2)}>
              {paymentType === 2 ? (
                <IconCheck width={scale(15)} height={scale(12)} />
              ) : (
                <View style={{width: scale(15)}} />
              )}
              <Text
                style={[
                  styles.text,
                  {marginLeft: scale(15), paddingVertical: verticalScale(4)},
                ]}>
                Thanh toán qua ZaloPay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderColor: '#DDDCDC',
            borderWidth: 1,
            marginTop: verticalScale(25),
            paddingHorizontal: scale(20),
            paddingVertical: scale(8),
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: verticalScale(8),
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              Tổng tiền hàng
            </Text>
            <View style={{flex: 1}} />
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              {Utils.formatPrice(total)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: verticalScale(8),
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              Phí vận chuyển
            </Text>
            <View style={{flex: 1}} />
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              {Utils.formatPrice(transportFee)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: verticalScale(8),
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              Giảm phí vận chuyển
            </Text>
            <View style={{flex: 1}} />
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              {Utils.formatPrice(-transportFee)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: verticalScale(8),
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              Tổng thanh toán
            </Text>
            <View style={{flex: 1}} />
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              {Utils.formatPrice(total)}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#9D9393',
              marginTop: verticalScale(12),
            }}
          />
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
            <Text
              style={[
                styles.text,
                {color: '#fff', fontSize: moderateScale(16)},
              ]}>
              Mua hàng
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default PaymentScreen;
const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#C9C5C5',
  },
  body: {
    flex: 1,
    marginTop: verticalScale(8),
    backgroundColor: '#fff',
    paddingHorizontal: scale(8),
  },
  addressBox: {
    borderColor: '#DDDCDC',
    borderWidth: 1,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: 2,
  },
  text: {
    ...Fonts.defaultRegular,
    fontSize: moderateScale(12),
    color: '#000',
  },

  productBox: {
    borderColor: '#DDDCDC',
    borderWidth: 1,
    marginTop: verticalScale(25),
    paddingHorizontal: scale(8),
  },
  timeReceive: {
    borderColor: '#DDDCDC',
    borderWidth: 1,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: 2,
    marginTop: verticalScale(20),
  },
  paymentType: {
    borderColor: '#DDDCDC',
    borderWidth: 1,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: 2,
    marginTop: verticalScale(20),
  },
  btnSubmit: {
    marginTop: verticalScale(15),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(45),
    backgroundColor: '#E50000',
    borderRadius: scale(4),
  },
});
