/* eslint-disable react-hooks/exhaustive-deps */
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
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import PCImage from '../../../assets/image/home/image_pc.png';
import {Fonts, ShadowStyle} from '../../utils/CommonStyles';
import {useNavigation} from '@react-navigation/native';
import productFactory from '../../redux/product/factory';
import Utils from '../../utils/Utils';
import Cart from '../../component/Cart';
import {useSelector} from 'react-redux';
const ProductListScreen = props => {
  const {title, id} = props.route.params;
  const navigation = useNavigation();
  const [productList, setProductList] = useState([]);
  const categoryGraph =
    useSelector(state => state?.category?.categoryGraph) || [];

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    var list = [];
    list = [...list, ...(await getProductListById(id))];
    console.log(list);
    const item = categoryGraph?.find(_item => _item?.data?.id == id);
    console.log('item ', item);
    console.log('graph ', categoryGraph);
    if (item) {
      console.log(item?.child?.length);
      await Promise.all(
        item?.child?.map(async i => {
          let childList = [];
          childList = [
            ...childList,
            ...(await getProductListById(i?.data?.id)),
          ];
          console.log('child ', childList);
          list = [...list, ...childList];
        }),
      );
    }
    setProductList(list);
  };
  const getProductListById = async _id => {
    const response = await productFactory.requestListProductById(_id);
    if (response?.data?.code === 'ok') {
      return response?.data?.result;
    }
    return [];
  };

  const renderProductItem = ({item, index}) => {
    return (
      <View style={{width: '50%', padding: scale(5)}} key={index}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            ...ShadowStyle,
            padding: scale(8),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.push('ProductDetail', {item: item})}>
          <Image
            source={
              item?.avtImageUrl != 'None' ? {uri: item?.avtImageUrl} : PCImage
            }
            style={{
              width: scale(80),
              height: scale(60),
              resizeMode: 'contain',
            }}
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{
                ...Fonts.defaultRegular,
                fontSize: moderateScale(10),
                color: '#000',
                marginTop: verticalScale(3),
              }}>
              {item?.name?.length > 28 ? item?.name : `${item?.name}\n`}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.defaultMedium,
                fontSize: moderateScale(12),
                color: '#F20707',
                marginTop: verticalScale(3),
              }}>
              {Utils.formatPrice(item?.price)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header center={title} left={<BackButton />} right={<Cart />} />
      <View style={styles.body}>
        <FlatList
          style={styles.listProduct}
          data={productList}
          renderItem={renderProductItem}
          numColumns={2}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  body: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  listProduct: {
    flex: 1,
  },
});
export default ProductListScreen;
