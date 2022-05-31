const { get_data_all, create_new_data, information, value, sensor_status } = require("./handle.data");

//Hàm xử lý nhận và gửi tin nhắn qua socket.io
module.exports.board = function (id, name_space, web_app_socket) {
    //Hàm xử lý nhận và gửi dữ liệu qua socket.io của board cảm biến
    name_space.on("connection", (socket) => {    
        //Hàm nhận trạng thái của cảm biến
        socket.on("sensor_status", (data) => {
            sensor_status(id, Object.keys(data)[0], data[Object.keys(data)[0]]);
            web_app_socket.emit("sensor_status", {
              id:id,
              sensor_name: Object.keys(data)[0],
              sensor_status: data[Object.keys(data)[0]]
            });
        });

        // Hàm nhận giá trị từ board cảm biến
        socket.on("sensor_data", (data) => {
            value(id, data[0], data[1], data[2]);
            console.log(data);
            web_app_socket.emit("all_data", get_data_all());
        });
        

        //Hàm nhận thông tin hệ thống của sensor board
        socket.on("system_information", (data) => {
            information(id, Object.keys(data)[0], data[Object.keys(data)[0]]);
            web_app_socket.emit("all_data", get_data_all());
        })
    });
}

module.exports.webapp = function(web_app_socket, socket_init) {
    //Hàm xử lý nhận và gửi dữ liệu qua socket.io của ứng dụng điện thoại hoặc trang web
    web_app_socket.on("connection", (socket) => {
        console.log("web_app connected");
        web_app_socket.emit("send_all_data", get_data_all());

        socket.on("add_new_board", data => {
            create_new_data(data);
            socket_init();
        })
    });
}
