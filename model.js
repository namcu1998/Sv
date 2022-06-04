const { v4: uuidv4 } = require("uuid");
let information_model = [
  {
    id: "ram",
    name: "Ram used",
    unit: true,
    unit_name: "byte",
    value: "",
  },
  {
    id: "ip",
    name: "Ip Address",
    unit: false,
    unit_name: "no",
    value: "",
  },
  {
    id: "rssi",
    name: "WiFi stength",
    unit: true,
    unit_name: "db",
    value: "",
  },
  {
    id: "cpu_clock",
    name: "CPU speed",
    unit: true,
    unit_name: "Mhz",
    value: "",
  },
  {
    id: "working_time",
    name: "Working time",
    unit: false,
    unit_name: "no",
    value: "",
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
      current_value: 0,
      before_value: 0,
      maxValue: 100,
      state_value: "DOWN",
      update_time: "",
      unit: "°C",
      data: [],
    },
    {
      id: "humidity",
      name: "Humidity",
      icon_name: "Humidity",
      current_value: 0,
      before_value: 0,
      maxValue: 100,
      state_value: "UP",
      update_time: "",
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
      maxValue: 27519,
      state_value: "DOWN",
      update_time: "",
      unit: "Lux",
      data: [],
    },
  ],
}

const sensor_board_model = function (name, name_space, list_sensor) {
  let sensor = [];

  list_sensor.map(item => {
    if (item.name === 'DHT11' && item.isUsed === true) sensor.push(DHT11);
    if (item.name === 'BH1750' && item.isUsed === true) sensor.push(BH1750);
  })

  return {
    id: uuidv4(),
    name: name,
    connected: false,
    namespace: name_space,
    list_sensor: [
      ...list_sensor
    ],
    sensor: sensor,
    sensor_board_information: information_model,
  };
};

module.exports = { sensor_board_model };
