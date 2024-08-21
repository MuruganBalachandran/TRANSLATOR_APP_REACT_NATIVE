import React, { useState } from 'react';
import { View, Text, Image, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { COLORS } from '../Utils/COLORS';
import { FONTFAMILY, FONTSIZE } from '../Utils/Font';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { USER_DATA } from '../Data/UserData';
import RateThisApp from '../Components/BottomModals/RateThisApp';
import ShareThisApp from '../Components/BottomModals/ShareThisApp';
import PrivacyPolicy from '../Components/BottomModals/PrivacyPolicy';

const { width } = Dimensions.get("window");

export default function CustomDrawer(props) {
  const streak = 0;

  // State for modals
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: COLORS.PRIMARY_LIGHT }}>
        <View style={{ margin: 10, justifyContent: "center", alignItems: "flex-start" }}>
          <Image
            source={USER_DATA.image}
            style={{
              width: width * 0.18,
              height: width * 0.18,
              borderRadius: 99,
              borderWidth: 1,
              borderColor: COLORS.WHITE,
            }}
          />
          <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
            <Text style={{ fontSize: FONTSIZE.SUB_TITLE, fontFamily: FONTFAMILY.BOLD, color: COLORS.WHITE }}>
              {USER_DATA.name}
            </Text>
          
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: COLORS.WHITE, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 10, borderTopWidth: 0.3, borderColor: COLORS.BLACK, margin: 10 }}>
        {/* Rate this app */}
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}
          onPress={() => setRateModalVisible(true)}
        >
          <AntDesign name="like2" size={22} color={COLORS.BLACK} />
          <Text style={{ fontSize: FONTSIZE.TEXT, color: COLORS.BLACK, alignSelf: "center" }}>Rate this app</Text>
        </TouchableOpacity>
        {/* Share this app */}
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}
          onPress={() => setShareModalVisible(true)}
        >
          <FontAwesome5 name="share-alt" size={22} color={COLORS.BLACK} />
          <Text style={{ fontSize: FONTSIZE.TEXT, color: COLORS.BLACK, alignSelf: "center" }}>Share this app</Text>
        </TouchableOpacity>
        {/* Privacy policy */}
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}
          onPress={() => setPrivacyModalVisible(true)}
        >
          <MaterialCommunityIcons name="security" size={22} color={COLORS.BLACK} />
          <Text style={{ fontSize: FONTSIZE.TEXT, color: COLORS.BLACK, alignSelf: "center" }}>Privacy policy</Text>
        </TouchableOpacity>
      </View>

      {/* Rate this app modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={rateModalVisible}
        onRequestClose={() => setRateModalVisible(false)}
      >
       <RateThisApp setRateModalVisible={setRateModalVisible} />
      </Modal>

      {/* Share this app modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={shareModalVisible}
        onRequestClose={() => setShareModalVisible(false)}
      >
     <ShareThisApp setShareModalVisible={setShareModalVisible} />
      </Modal>

      {/* Privacy policy modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={privacyModalVisible}
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
      <PrivacyPolicy setPrivacyModalVisible={setPrivacyModalVisible} />
      </Modal>
    </View>
  );
}
