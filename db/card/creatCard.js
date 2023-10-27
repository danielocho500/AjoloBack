const Card = require("../../models/Creditcards");

/*
  : {
    type: DataTypes.DATE,
    allowNull: false,
  },
  normalized_name: {
    type: DataTypes.VARCHAR(100),
    allowNull: false,
  },
  enabled: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
*/


const createCard = async (uuid) => {
    try{
        await Card.create({
            uuid,
            card_number,
            card_holder,
            card_expiration_month,
            card_expiration_year
            
        })

        console.log(code_qr)

        return code_qr;
    }
    catch(e){
        console.log(e)
        return -1;
    }
};

module.exports = {
  createQR,
};
