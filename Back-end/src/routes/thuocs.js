var express = require('express');

var router = express.Router();
const middlwareController = require('../app/controllers/MiddlewareController');
const thuocController = require('../app/controllers/ThuocController');
const upload = require('../app/controllers/MiddlewareUpload')


// thuocsController.create;

router.get('/getAll', thuocController.getAllThuoc)
// router.get('/create', middlwareController.verifyTokenJustAdminAuth ,thuocController.create)
// router.post('/store',middlwareController.verifyTokenJustAdminAuth , thuocController.createThuoc)
router.post('/store', upload.array('files', 4), middlwareController.verifyTokenJustAdminAuth, thuocController.createImage)
// router.get('/:id/edit', thuocController.edit)
// router.post('/handle-form-actions', thuocController.handleFormActions)
router.put('/:id', upload.array('files', 4), middlwareController.verifyTokenJustAdminAuth, thuocController.updateThuoc)
router.patch('/:id/restore', thuocController.restore)
router.delete('/:id', middlwareController.verifyTokenJustAdminAuth, thuocController.destroyThuoc)
router.delete('/:id/force', middlwareController.verifyTokenJustAdminAuth, thuocController.forceDestroyThuoc)
// thuocsController.show;
// router.get('getid/:id', thuocController.getThuocById)


module.exports = router;