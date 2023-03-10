import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

const RestaurantsSheet = (props) => {
  const { appointments, handleShowStatusSheet, handleShowAppoint, compineDT } =
    props;
  const snapPoints = useMemo(() => ["20%", "70%", "95%"], []);
  const bottomSheetRef = useRef(null);

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
      <ScrollView></ScrollView>
    </BottomSheet>
  );
};

export default RestaurantsSheet;
