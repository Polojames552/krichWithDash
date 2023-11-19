import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LineChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';

const Sample = () => {
  useEffect(() => {
    fetchData();
  }, []);
  // Dummy data for line chart (replace with your actual data)
  const lineChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        data: [
          500, 1000, 750, 1200, 900, 1500, 500, 1000, 750, 1200, 900, 1500,
        ],
      },
    ],
  };

  const [profitToday, setProfitToday] = useState(0);
  const [profitMonth, setProfitMonth] = useState(0);
  const containersStock = 100;
  const numberOfSales = 30;
  const [data, setData] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const fetchData = async () => {
    const response = await fetch(
      `https://krichsecret.000webhostapp.com/Products/Display/DisplaySalesData.php`,
    );
    const result = await response.json();
    if (result.success) {
      setData(result.data);
      if (result.status === 'done') {
        const totalPriceSum = result.data.reduce(
          (accumulator, item) => accumulator + item.total_price,
          0,
        );
      }
    } else {
      // console.error('Data fetch failed:', result.message);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Sales Data</Text>
      </View>
      <Text
        style={[
          styles.title,
          {
            color: 'black',
            paddingTop: 20,
            paddingLeft: 10,
            marginBottom: -15,
            fontSize: 20,
          },
        ]}>
        Montly Sales ({currentYear})
      </Text>
      <View style={[styles.chartContainer, {marginBottom: 10}]}>
        <LineChart
          data={lineChartData}
          width={screenWidth - 50} // from react-native
          height={200}
          yAxisLabel="₱"
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(13, 110, 253, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
        />
      </View>
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <FontAwesome5 name="chart-line" style={styles.icon} />
          <Text style={styles.metricLabel}>Daily Profit: </Text>
          <Text style={styles.metricValue}>₱{profitToday}</Text>
        </View>

        <View style={styles.metricItem}>
          <FontAwesome5 name="boxes" style={styles.icon} />
          <Text style={styles.metricLabel}>Containers Stock:</Text>
          <Text style={styles.metricValue}>{containersStock}</Text>
        </View>

        <View style={styles.metricItem}>
          <FontAwesome5 name="cash-register" style={styles.icon} />
          <Text style={styles.metricLabel}>Number of Sales:</Text>
          <Text style={styles.metricValue}>{numberOfSales}</Text>
        </View>

        <View style={styles.metricItem}>
          <FontAwesome5 name="chart-bar" style={styles.icon} />
          <Text style={[styles.metricLabel, {fontWeight: 'bold'}]}>
            Total Profit:
          </Text>
          <Text style={styles.metricValue}> ₱{profitMonth}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: '#0d6efd',
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  metricsContainer: {
    padding: 20,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
    color: '#0d6efd',
  },
  metricLabel: {
    fontSize: 18,
    color: '#333',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d6efd',
  },
  chartContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
});
export default Sample;
