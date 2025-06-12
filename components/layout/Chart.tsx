import { typeData } from "@/app/pages/dashboard";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import PieChart from "react-native-pie-chart";


const {width, height} = Dimensions.get("window");

const radius = 125;
const labelRadius = 85; // aumenta se quiser mais longe do centro
const centerX = width / 5.5;
const centerY = height / 12;

const getLabelPosition = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  sliceAngle: number,
  offsetDegrees = 10
) => {
  const midAngle = startAngle + sliceAngle / 2 + (offsetDegrees * Math.PI) / 260;

  return {
    x: centerX + radius * Math.cos(midAngle),
    y: centerY + radius * Math.sin(midAngle),
  };
};

const getOverlayPositions = (
  data: number[],
  centerX: number,
  centerY: number,
  labelRadius: number,
  offsetDegrees = 10
) => {
  const total = data.reduce((sum, val) => sum + val, 0);
  let currentAngle = -Math.PI / 2;

  return data.map((value) => {
    const sliceAngle = (value / total) * 2 * Math.PI;

    const pos = getLabelPosition(centerX, centerY, labelRadius, currentAngle, sliceAngle, offsetDegrees);

    currentAngle += sliceAngle;
    return pos;
  });
};

type Props = {
    data: typeData[]
}

export default function Chart({data}:Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const series = data.map(item => item.value)
  const labels = data.map(item => item.legendValue)

  const positions = getOverlayPositions(series, centerX, centerY, labelRadius, 10);

  return (
    <View style={styles.container}>
      <PieChart
        widthAndHeight={radius * 2}
        series={data}
        cover={0.45}
      />

      {positions.map((pos, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedIndex(index)}
          style={[
            styles.overlayButton,
            {
              left: pos.x,
              top: pos.y,
            },
          ]}
        >
          <Text style={styles.overlayText}>⬤</Text>
        </TouchableOpacity>
      ))}

      {selectedIndex !== null && (
        <Text style={styles.infoText}>Gasto de {labels[selectedIndex]}: {series[selectedIndex]} R$</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  overlayButton: {
    position: "absolute",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontSize: 44,
    color: "transparent",
  },
  infoText: {
    marginTop: 20,
    fontSize: 18,
    color: "#00FFFF",
  },
});
