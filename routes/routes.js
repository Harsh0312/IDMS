

const express = require('express');

const controller = require('../controller/controller');

const router = express.Router();

router.get('/login',controller.getLogin);
router.get('/index',controller.getIndex);
router.post('/logout',controller.logOut);
router.post('/meta',controller.LoginWithMeta);
router.post('/empass',controller.LoginwithEmPass);

//special Routes
router.post("/storeblock",controller.storeblock);


// inApp Routes behin here
router.get('/profile',controller.getProfile);
router.get('/updoc',controller.getDocUpload);
router.get("/viewDocReq",controller.getDocRequests);
//inApp Routes end Here
router.get('/',controller.getWrapper);

module.exports = router;