import React from 'react';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import {View, StyleSheet} from 'react-native';

const config = {
  hasXAxisBackgroundLines: false,
  xAxisLabelStyle: {
    position: 'left',
    prefix: '$',
  },
};

const Chart = () => (
  <View>
    <VerticalBarGraph
      data={[20, 45, 28, 80, 99, 43, 50]}
      labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
      width={375}
      height={300}
      barRadius={5}
      barWidthPercentage={0.65}
      barColor="#53ae31"
      baseConfig={config}
      style={styles.chart}
    />
  </View>
);

const styles = StyleSheet.create({
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: 375,
  },
});

export default Chart;
