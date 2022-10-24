const router = require('express').Router()
const users = require("../controllers/usersCt")
const auth = require("../helpers/auth");
const User = require('../schemas/usersSchema');
const Streaks = require('../schemas/streaksSchema');
const streaks = require('../controllers/streaksCt');

// REFACTORY----------------------------------
// Validaciones
const { check, body, validationResult } = require('express-validator'); 

router.post(
    "/login", 
    body('email').isEmail().withMessage('email mal formado') ,
    body('pass').isLength({ min: 3 }).withMessage('el password debe tener una longitud mayor a tres caracteres') ,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/users/login');
        }else {
            req.session.success = true;
            req.session.errors = null;
            users.sendLoginForm(req, res);
        }
    }
);

router.get('/login', function (req, res) {
    res.render('loginForm', {
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null;
});

router.post(
    "/register", 
    check('name').not().isEmpty().withMessage('ingrese un nombre') ,
    check('lastName').not().isEmpty().withMessage('no ingreso su apellido') ,
    body('email').isEmail().withMessage('email mal formado o el mail ya existe') ,
    body('pass').isLength({ min: 3 }).withMessage('el password debe tener una longitud mayor a tres caracteres') ,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/users/register');
        }else {
            req.session.success = true;
            req.session.errors = null;
            users.sendRegisterForm(req, res);
        }
    }
)

router.get("/register", function (req, res) {
    res.render('registerForm', {
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null;
})
// END REFACTORY------------------------------



router.get("/logout", users.logout)
router.get("/settings", auth, users.getSettings)
router.post("/settings", auth, users.sendSettings)
router.get("/validate", auth, users.validateEmail)
router.get("/delete", auth, users.deleteUser)

router.post("/secret", streaks.sendStreaksForm)
router.get("/secret", streaks.getStreaksForm)


// Toma todos los registros de los usuarios (in-progress)
router.get('/findall', function(req, res) {
    Streaks.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            console.log(data)
            res.send(data);
        }
    });  
});

// REFACTORY----------------------------------
// Para recibir solo las rachas del usuario
router.get('/records/:userid', function(req, res) {
    Streaks.find({ userId: req.params.userid}, function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            // console.log(data)
            res.send(data);
        }
    });  
});
// END REFACTORY ----------------------------------


router.post('/update', function(req, res) {
    let body = req.body;
    Streaks.updateOne({ _id: body._id }, {
            $set: {
                partialHits: body.partialHits,
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el cliente',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});

router.delete('/delete', (req, res) => {
    let body = req.body;
    Streaks.deleteOne({_id: body._id}).then(
        () => {
        res.status(200).json({
            message: 'Deleted!'
        });
        }
    ).catch(
        (error) => {
        res.status(400).json({
            error: error
        });
        }
    );
});

module.exports = router;


