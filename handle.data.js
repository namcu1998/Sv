const fs = require("fs");
const { data } = require("./firebase");
const moment = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");
let { sensor_board_model } = require("./model");

const array_length = 10;

function create_new_data(client_data) {
  let json_data = JSON.parse(
    fs.readFileSync("./sensor_board_data.json", "utf8")
  );
  let isExist = false;

  json_data.map((item) => {
    if (item.namespace === client_data.namespace) isExist = true;
  });

  isExist === false &&
    json_data.push(sensor_board_model(client_data.name, client_data.namespace, client_data.list_sensor));

  var stringfy_data = JSON.stringify(json_data);
  fs.writeFileSync("./sensor_board_data.json", stringfy_data);
}

function information(id, name, value) {
  let json_data = JSON.parse(
    fs.readFileSync("./sensor_board_data.json", "utf8")
  );

  json_data.map((item, index) => {
    if (item.id === id) {
      return item.sensor_board_information.map((item1, index1) => {
        if (item1.id === name) {
          json_data[index].sensor_board_information[index1] = {
            id: item1.id,
            name: item1.name,
            unit: item1.unit,
            unit_name: item1.unit_name,
            value: value,
          };
        }
      });
    }
  });

  data.set(json_data);
  var stringfy_data = JSON.stringify(json_data);
  fs.writeFileSync("./sensor_board_data.json", stringfy_data);
}

function value(id, sensor_name, sensor_value_name, value) {
  let json_data = JSON.parse(
    fs.readFileSync("./sensor_board_data.json", "utf8")
  );

  json_data.map((item, index) => {
    if (item.id === id) {
      item.sensor.map((item2, index2) => {
        if (sensor_name === item2.id) {
          item2.data.map((item3, index3) => {
            if (sensor_value_name === item3.id) {
              json_data[index].sensor[index2].data[index3] = {
                id: item3.id,
                name: item3.name,
                icon_name: item3.icon_name,
                current_value: value,
                before_value: item3.current_value,
                state_value: value > item3.current_value ? "UP" : "DOWN",
                update_time: moment().tz("Asia/Ho_Chi_Minh").format("h:mm:ss"),
                unit: item3.unit,
                data:
                  item3.data !== undefined
                    ? [
                        {
                          id: uuidv4(),
                          current_value: value,
                          before_value: item3.current_value,
                          update_time: moment()
                            .tz("Asia/Ho_Chi_Minh")
                            .format("h:mm:ss a"),
                          update_date: moment()
                            .tz("Asia/Ho_Chi_Minh")
                            .format("L"),
                          unit: item3.unit,
                        },
                        ...item3.data,
                      ]
                    : [
                        {
                          id: uuidv4(),
                          current_value: value,
                          before_value: item3.current_value,
                          update_time: moment()
                            .tz("Asia/Ho_Chi_Minh")
                            .format("h:mm:ss a"),
                          update_date: moment()
                            .tz("Asia/Ho_Chi_Minh")
                            .format("L"),
                          unit: item3.unit,
                        },
                      ],
              };

              json_data[index].sensor[index2].data[index3].data.length =
                array_length;
            }
          });
        }
      });
    }
  });

  data.set(json_data);
  var stringfy_data = JSON.stringify(json_data);
  fs.writeFileSync("./sensor_board_data.json", stringfy_data);
}

function sensor_status(id, sensor_name, value) {
  let json_data = JSON.parse(
    fs.readFileSync("./sensor_board_data.json", "utf8")
  );

  json_data.map((item, index) => {
    if (item.id === id) {
      item.sensor.map((item2, index2) => {
        if (item2.id === sensor_name) {
          json_data[index].sensor[index2].connected = value === "true" ? true : false;
        }
      });
    }
  });


  data.set(json_data);
  var stringfy_data = JSON.stringify(json_data);
  fs.writeFileSync("./sensor_board_data.json", stringfy_data);
}

function board_status(id, status) {
  let json_data = JSON.parse(
    fs.readFileSync("./sensor_board_data.json", "utf8")
  );

  json_data.map((item, index) => {
    if (item.id === id) {
      json_data[index].connected = status;
    }
  });

  data.set(json_data);
  var stringfy_data = JSON.stringify(json_data);
  fs.writeFileSync("./sensor_board_data.json", stringfy_data);
}

function get_data_all() {
  return JSON.parse(fs.readFileSync("./sensor_board_data.json", "utf8"));
}

function get_database(callback) {
  data.once("value", function (dataSnapshot) {
    if (dataSnapshot.val()) {
      var stringfy_data = JSON.stringify(dataSnapshot.val());
      fs.writeFileSync("./sensor_board_data.json", stringfy_data);
      callback();
    }
  });
}

module.exports = {
  information,
  value,
  sensor_status,
  get_data_all,
  board_status,
  create_new_data,
  get_database
};
