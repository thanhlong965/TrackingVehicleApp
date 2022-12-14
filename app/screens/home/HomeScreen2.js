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
  Alert,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../component/Header';
import MapView, {Marker} from 'react-native-maps';
import {useState} from 'react';
import {Fonts, ShadowStyle} from '../../utils/CommonStyles';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import Geolocation from 'react-native-geolocation-service';
import {
  CameraDeviceFormat,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  PhotoFile,
  sortFormats,
  useCameraDevices,
  useFrameProcessor,
  VideoFile,
  Camera,
} from 'react-native-vision-camera';
import {useRef} from 'react';
import axios from 'axios';
const HomeScreen2 = props => {
  const camera = useRef();
  const [path, setPath] = useState();
  const [isTracking, setTracking] = useState(false);
  const position = useRef();
  const [currentTime, setCurrentTime] = useState();

  const askPermissionAndroid = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      // getPosition();
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      // getPosition();
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      // getPosition();
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
      // getPosition();
    }

    return true;
  };
  useEffect(() => {
    if (Platform.OS == 'ios') {
      askPermission();
    } else {
      askPermissionAndroid();
    }
  }, []);
  const askPermission = async () => {
    const status = await Geolocation.requestAuthorization('whenInUse');
    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
      return false;
    }
  };
  const asyncIntervals = [];

  const runAsyncInterval = async (cb, interval, intervalIndex) => {
    await cb();
    if (asyncIntervals[intervalIndex].run) {
      asyncIntervals[intervalIndex].id = setTimeout(
        () => runAsyncInterval(cb, interval, intervalIndex),
        interval,
      );
    }
  };

  const setAsyncInterval = (cb, interval) => {
    if (cb && typeof cb === 'function') {
      const intervalIndex = asyncIntervals.length;
      asyncIntervals.push({run: true, id: 0});
      runAsyncInterval(cb, interval, intervalIndex);
      return intervalIndex;
    } else {
      throw new Error('Callback must be a function');
    }
  };

  const clearAsyncInterval = intervalIndex => {
    if (asyncIntervals[intervalIndex].run) {
      clearTimeout(asyncIntervals[intervalIndex].id);
      asyncIntervals[intervalIndex].run = false;
    }
  };
  const trackingEvery = () => {
    setAsyncInterval(async () => {
      getPosition();
      await callApi();
    }, 10000);
    // while (isTracking) {
    //   const date = new Date();
    //   conso
    //   if (!currentTime) {
    //     setCurrentTime(date);
    //   } else {
    //     const diff = date - currentTime;
    //     console.log(diff);
    //   }
    // }
  };

  const takePhoto = async () => {
    const photo = await camera.current.takePhoto({});
    setPath('file://' + photo?.path);
    return photo;
  };
  const callApi = async () => {
    try {
      const photo = await takePhoto();
      let filename = photo?.path.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : 'image';
      let formData = new FormData();
      formData.append('longitude', position.current?.longitude);
      formData.append('latitude', position.current?.latitude);
      formData.append('speed', position.current?.speed);
      formData.append('image1', {
        uri: 'file://' + photo?.path,
        name: filename,
        type,
      });
      formData.append('image2', {
        uri: 'file://' + photo?.path,
        name: filename,
        type,
      });

      console.log(formData);
      axios({
        method: 'POST',
        url: 'https://trackingdatavehical-production-f395.up.railway.app/api/Position/add-position-By-File',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(response?.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getPosition = () => {
    try {
      Geolocation.getCurrentPosition(
        info => {
          position.current = {...info?.coords};
          // callApi(info?.coords);
        },
        error => {},
        {
          enableHighAccuracy: true,
          timeout: 20000,
          distanceFilter: 0.01,
          accuracy: 'high',
          maximumAge: 1000,
        },
      );
      return position.current;
    } catch (e) {
      console.log(e);
    }
  };
  const devices = useCameraDevices();
  const device = devices.back;
  // const getPermission = async () => {
  //   const newCameraPermission = await Camera.requestCameraPermission();
  // };

  return (
    <View style={styles.container}>
      {device == null ? (
        <View />
      ) : (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={camera}
          photo={true}
        />
      )}

      <Header />
      <Image
        source={{
          uri: path,
        }}
        style={{width: scale(100), height: scale(100)}}
      />
      <View style={{flex: 1}} />
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: verticalScale(10),
        }}>
        <TouchableOpacity
          onPress={() => {
            if (isTracking) {
              clearAsyncInterval(trackingEvery);
            } else {
              trackingEvery();
            }
            setTracking(!isTracking);
          }}
          style={{
            backgroundColor: '#fff',
            paddingVertical: verticalScale(10),
            alignItems: 'center',
            borderRadius: scale(8),
            paddingHorizontal: scale(10),
          }}>
          <Text
            style={{
              fontSize: moderateScale(14),
              ...Fonts.defaultMedium,
              color: '#000',
            }}>
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    ...ShadowStyle,
    elevation: 1,
    backgroundColor: '#fff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default HomeScreen2;
