const Reviewstalls = require("../models/Reviewstalls")

const getAverage = async idStall => {
    let sum = 0;
    let i = 0;

    const reviews = await Reviewstalls.findAll({where: { id_stall: idStall }})

    for (let j = 0; j < reviews.length; j++) {
        sum += reviews[j].points;
        i++;
    }

    if(sum == 0 || i == 0){
        return 0;
    }
    else{
        return sum / i;
    }
}

module.exports = {
    getAverage
}