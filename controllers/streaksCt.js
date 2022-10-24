const Streaks = require("../schemas/streaksSchema")

function getStreaksForm(req, res, next) {
    res.render("streak")
};

async function sendStreaksForm(req, res, next) {
    const { 
        name, 
        unitInterval, 
        amount, 
        amountP,
    } = req.body
    let finalAmount;
    (parseInt(amount) == 8) ? finalAmount = amountP : finalAmount = amount;
    let userId          = req.session.user.id ;
    let partialHits     = 0; 
    let goalHits        = 0; //in-progress
    let fails           = 0; //in-progress
    let failsPosition   = 0; //in-progress
    let success         = 0; //in-progress
    const newStreak = new Streaks({
        name, 
        unitInterval, 
        amount: finalAmount, 
        userId, 
        partialHits, 
        goalHits, 
        fails, 
        failsPosition, 
        success
    })
    const str = {
        name:           newStreak.name, 
        unitInterval:   newStreak.unitInterval, 
        amount:         newStreak.finalAmount, 
        userId:         newStreak.userId, 
        partialHits:    newStreak.partialHits, 
        goalHits:       newStreak.goalHits, 
        fails:          newStreak.fails, 
        failsPosition:  newStreak.failsPosition, 
        success:        newStreak.success
    }

    newStreak.save((err) => {
        if (err) {
            console.log("error ruben ", err);
        } else {
            req.session.streak = str
            res.redirect("/secret")

        }
    })
};
module.exports = { sendStreaksForm, getStreaksForm }