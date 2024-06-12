const express = require('express');
const Object = require('./draft_schema');
//const {notifyClients} = require('./draft_lib_module');

const router = express.Router();

// API để thêm dữ liệu vào cơ sở dữ liệu
router.post('/draft', async (req, res) => {
    try {
        const data = req.body.objects;

        // Thêm dữ liệu vào database
        for (const e of data) {
            const obj = new Object({
                timeApear: e.timeApear,
                properties: {
                    name: e.properties.name,
                    currentLocation: {
                        x: e.properties.currentLocation.x,
                        y: e.properties.currentLocation.y,
                        z: e.properties.currentLocation.z
                    }
                }
            });

            await obj.save();
        };

        // Gửi message tới tất cả client
        io.emit('newData', data);

        res.status(200).send('Data received and clients notified');
    }
    catch (error) {
        console.log('Error: ', error);
        res.status(500).send('Error: ', error);
    }
});


module.exports = router;
// const express = require('express');
// const Object = require('./draft_schema');
// const bodyParser = require('body-parser');
// const {notifyClients} = require('./draft_lib_module');

// const router = express.Router();



// router.post('/draft', async (req, res) => {
//     try {
//         const objectList = req.body.objects;
        
//         objectList.forEach(e => {
//             const obj = new Object({
//                 timeApear: e.timeApear,
//                 properties: {
//                     name: e.properties.name,
//                     currentLocation: {
//                         x: e.properties.currentLocation.x,
//                         y: e.properties.currentLocation.y,
//                         z: e.properties.currentLocation.z
//                     }
//                 }
//             });

//             await obj.save();
//         });

//         notifyClients('object-detection', objectList)

//         res.status(200).send('Create object successfully!');
//     } catch (error) {
//         console.log('Error: ', error);
//         res.status(500).send('Error: ', error);
//     }
// });



// module.exports = router;
