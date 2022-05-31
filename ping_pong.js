const { board_status, get_data_all } = require("./handle.data");

//Hàm ping và pong
module.exports = function (id, sensor_board_socket, webapp_socket) {
    let pong_count = 0;
    let status = [false, false];

    //Hàm nhận phản hồi ping từ board cảm biến
    sensor_board_socket.on("connection", (socket) => {
        socket.on("pong", (data) => {
            pong_count = 0;
            status[0] = true;
            // console.log("pong")
        });
    })
    const ping_pong = new Promise((resolve, reject) => {
        let ping_time = 0;

        setInterval(() => {
            ping_time++;
            pong_count++;

            if (ping_time === 2) {
                sensor_board_socket.emit("ping", "nam");
                ping_time = 0;
            }

            if (pong_count >= 10) {
                pong_count = 0;
                status[0] = false;
            }

            if (status[0] !== status[1]) {
                board_status(id, status[0]);
                get_data_all().map(item => {
                  if (item.id === id) {
                    webapp_socket.emit('board_status', {
                      board_name: item.name,
                      board_status: status[0]
                    })
                  }
                })
                
                status[1] = status[0];
            }
        }, 1000);
    });   
};
