const { v4: uuidv4 } = require("uuid");
let information_model = [
  {
    id: "ram",
    name: "Ram used",
    unit: true,
    unit_name: "byte",
    value: "201168",
  },
  {
    id: "ip",
    name: "Ip Address",
    unit: false,
    unit_name: "no",
    value: "192.168.0.105",
  },
  {
    id: "rssi",
    name: "WiFi stength",
    unit: true,
    unit_name: "db",
    value: "-59",
  },
  {
    id: "cpu_clock",
    name: "CPU speed",
    unit: false,
    unit_name: "Mhz",
    value: "240",
  },
  {
    id: "working_time",
    name: "Working time",
    unit: false,
    unit_name: "no",
    value: "0 hour 9 minute",
  },
];

let DHT11 = {
  id: "DHT 11",
  name: "DHT 11",
  connected: true,
  data: [
    {
      id: "temperature",
      name: "Temperature",
      icon_name: "temperature",
      current_value: 32,
      before_value: 33,
      maxValue: 100,
      state_value: "DOWN",
      update_time: "11:08:36",
      unit: "°C",
      data: [],
    },
    {
      id: "humidity",
      name: "Humidity",
      icon_name: "Humidity",
      current_value: 62,
      before_value: 61,
      maxValue: 100,
      state_value: "UP",
      update_time: "11:11:01",
      unit: "%",
      data: [],
    },
  ],
}

let BH1750 = {
  id: "BH1750",
  name: "BH1750",
  connected: true,
  data: [
    {
      id: "light_intensity",
      name: "Light intensity",
      icon_name: "light_intensity",
      current_value: 0,
      before_value: 0,
      maxValue: 100,
      state_value: "DOWN",
      update_time: "",
      unit: "Lux",
      data: [],
    },
  ],
}

const sensor_board_model = function (name, name_space, list_sensor) {
  return {
    id: uuidv4(),
    name: name,
    connected: false,
    namespace: name_space,
    list_sensor: [
      ...list_sensor
    ],
    sensor: list_sensor.map(item => {
      if (item.name === 'DHT11' && item.isUsed === true) return DHT11;
      if (item.name === 'BH1750' && item.isUsed === true) return BH1750;
    }),
    sensor_board_information: information_model,
  };
};

module.exports = { sensor_board_model };
