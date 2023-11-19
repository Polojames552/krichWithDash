import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const SalesDashboard = () => {
  const [data, setData] = useState([]);
  const [jan, setJan] = useState(0);
  const [feb, setFeb] = useState(0);
  const [mar, setMar] = useState(0);
  const [apr, setApr] = useState(0);
  const [may, setMay] = useState(0);
  const [jun, setJun] = useState(0);
  const [jul, setJul] = useState(0);
  const [aug, setAug] = useState(0);
  const [sep, setSep] = useState(0);
  const [oct, setOct] = useState(0);
  const [nov, setNov] = useState(0);
  const [dec, setDec] = useState(0);

  const [profitToday, setProfitToday] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [total_Profit, setTotal_Profit] = useState(0);

  const [dailyContainers, setDailyContainers] = useState(0);
  const [dailyWaters, setDailyWaters] = useState(0);

  const [monthlyContainers, setMonthlyContainers] = useState(0);
  const [monthlyWaters, setMonthlyWaters] = useState(0);

  const screenWidth = Dimensions.get('window').width;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    fetchData();
  }, []);
  // Dummy data for line chart (replace with your actual data)
  const lineChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
      },
    ],
  };

  const fetchData = async () => {
    const response = await fetch(
      `https://krichsecret.000webhostapp.com/Products/Display/DisplaySalesData.php`,
    );
    const result = await response.json();
    if (result.success) {
      // Total-Profit
      setTotal_Profit(
        result.data
          .filter(item => item.Status === 'Done')
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );

      // Daily DATA
      const now = new Date();
      const options = {month: 'long', day: 'numeric', year: 'numeric'};
      const formattedDate = now.toLocaleString('en-US', options);
      // console.log('Time: ', formattedDate);
      setProfitToday(
        result.data
          .filter(
            item =>
              item.Status === 'Done' && item.time_updated === formattedDate,
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Containers sales
      setDailyContainers(
        result.data
          .filter(
            item =>
              item.Status === 'Done' &&
              item.Type === 'Container' &&
              item.time_updated === formattedDate,
          )
          .reduce((accumulator, item) => accumulator + item.Quantity, 0),
      );
      // Waters Sales
      setDailyWaters(
        result.data
          .filter(
            item =>
              item.Status === 'Done' &&
              item.Type === 'Water' &&
              item.time_updated === formattedDate,
          )
          .reduce((accumulator, item) => accumulator + item.Quantity, 0),
      );

      // Monthly data
      const monthly = new Date();
      const monthly_options = {month: 'long', year: 'numeric'};
      const monthly_date = monthly.toLocaleString('en-US', monthly_options);
      // console.log('Time: ', formattedDate);
      setMonthlyProfit(
        result.data
          .filter(
            item =>
              item.Status === 'Done' &&
              item.time_updated.replace(/\d{1,2}, /, '') === monthly_date,
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );

      setMonthlyContainers(
        result.data
          .filter(
            item =>
              item.Status === 'Done' &&
              item.Type === 'Container' &&
              item.time_updated.replace(/\d{1,2}, /, '') === monthly_date,
          )
          .reduce((accumulator, item) => accumulator + item.Quantity, 0),
      );
      setMonthlyWaters(
        result.data
          .filter(
            item =>
              item.Status === 'Done' &&
              item.Type === 'Water' &&
              item.time_updated.replace(/\d{1,2}, /, '') === monthly_date,
          )
          .reduce((accumulator, item) => accumulator + item.Quantity, 0),
      );

      // Graph data
      const options_year = {year: 'numeric'};
      const formattedYear = now.toLocaleString('en-US', options_year);
      // Graph for January
      setJan(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'January ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for Febuary
      setFeb(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'Febuary ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for March
      setMar(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'March ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for April
      setApr(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'April ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for May
      setMay(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'May ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for June
      setJun(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'June ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for July
      setJul(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'July ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for August
      setAug(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'August ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for September
      setSep(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'September ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for October
      setOct(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'October ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for November
      setNov(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'November ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
      // Graph for December
      setDec(
        result.data
          .filter(
            item =>
              item.time_updated.replace(/\d{1,2}, /, '') ===
                'December ' + formattedYear && item.Status === 'Done',
          )
          .reduce((accumulator, item) => accumulator + item.Total_Price, 0),
      );
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
        <Text
          style={[
            styles.title,
            {
              color: 'black',
              paddingTop: 20,
              paddingLeft: 10,
              marginBottom: 5,
              fontSize: 15,
            },
          ]}>
          Daily Sales
        </Text>
        <View
          style={[
            styles.metricItem,
            {
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <FontAwesome5 name="chart-line" style={styles.icon} />
          <Text style={[styles.metricLabel, {padding: 10}]}>Daily Profit:</Text>
          <Text style={styles.metricValue}>₱{profitToday}</Text>
        </View>
        <View style={styles.metricItem}>
          <FontAwesome5 name="boxes" style={styles.icon} />
          <Text style={styles.metricLabel}>Containers Sold</Text>
          <Text style={styles.metricValue}>{dailyContainers}</Text>
        </View>

        <View style={styles.metricItem}>
          <FontAwesome5 name="cash-register" style={styles.icon} />
          <Text style={styles.metricLabel}>Waters Sold</Text>
          <Text style={styles.metricValue}>{dailyWaters}</Text>
        </View>

        {/* Repeat the structure for the next row */}

        <Text
          style={[
            styles.title,
            {
              color: 'black',
              paddingTop: 20,
              paddingLeft: 10,
              marginBottom: 5,
              fontSize: 15,
            },
          ]}>
          Montly Sales
        </Text>
        <View
          style={[
            styles.metricItem,
            {
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <FontAwesome5 name="chart-line" style={styles.icon} />
          <Text style={[styles.metricLabel, {padding: 10}]}>
            Monthly Profit:
          </Text>
          <Text style={styles.metricValue}>₱{monthlyProfit}</Text>
        </View>
        <View style={styles.metricItem}>
          <FontAwesome5 name="boxes" style={styles.icon} />
          <Text style={styles.metricLabel}>Containers Sold</Text>
          <Text style={styles.metricValue}>{monthlyContainers}</Text>
        </View>

        <View style={styles.metricItem}>
          <FontAwesome5 name="cash-register" style={styles.icon} />
          <Text style={styles.metricLabel}>Waters Sold</Text>
          <Text style={styles.metricValue}>{monthlyWaters}</Text>
        </View>
        <View
          style={[
            styles.metricItem,
            {
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <FontAwesome5 name="chart-line" style={styles.icon} />
          <Text style={[styles.metricLabel, {padding: 10, fontWeight: 'bold'}]}>
            Annual Profit:
          </Text>
          <Text style={styles.metricValue}>₱{total_Profit}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  metricsContainer: {
    flexDirection: 'row', // Set the direction to row for side-by-side layout
    flexWrap: 'wrap', // Allow items to wrap to the next row
    justifyContent: 'space-between', // Adjust spacing between items
    paddingHorizontal: 16, // Add padding to the sides if needed
    backgroundColor: '#ffff',
  },
  metricItem: {
    width: '48%', // Set the width to less than 50% for two items in a row
    alignItems: 'center', // Center items horizontally
    marginVertical: 8, // Add vertical margin between rows if needed
    padding: 10, // Add padding around each item if needed
    borderWidth: 1, // Add borders for visualization
    borderColor: 'white', // Border color
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    elevation: 5,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8, // Add margin below the icon if needed
    color: '#0d6efd',
  },
  metricLabel: {
    fontSize: 15,
    marginBottom: 4, // Add margin below the label if needed
    color: '#333',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
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

  chartContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
});
export default SalesDashboard;
