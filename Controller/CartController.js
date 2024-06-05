const userDB = require('../Model/LoginUserModel')


const addToCart = async (req, res) => {
    try {
        let userData = await userDB.findOne({ userID: req.userId });//authentication userId
        let cartData = userData.cartData || {};

        let serviceId = req.body.s_id;

        if (!cartData[serviceId]) {
            cartData[serviceId] = 1;
        } else {
            cartData[serviceId] += 1;
        }

        await userDB.findOneAndUpdate({ userID: req.userId }, { cartData });
        // userData.cartData = cartData; // Assign updated cartData back to userData
        // await userData.save(); // Save the userData document

        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        res.json({ success: false, message: "Error adding to cart", details: error.message });
    }
};


const removeFromCart = async(req,res) =>{

  try {
    
    let userData = await userDB.findOne({userID:req.userId})
    let cartData = userData.cartData || {}

    let serviceId = req.body.s_id;

    if(cartData[serviceId]>0){
        cartData[serviceId]-=1
        if (cartData[serviceId] === 0) {
            delete cartData[serviceId];
        }
    }

    await userDB.findOneAndUpdate({userID:req.userId},{cartData})
    res.json({success:true, message:"Removed from cart"})

  } catch (error) {
    res.json({ success: false, message: "Error removed from cart", details: error.message });
  }
}


const deleteFromCart = async(req,res)=>{
    try{
        let userData = await userDB.findOne({userID:req.userId})
        let cartData = userData.cartData || {}

        let serviceId = req.body.s_id;
    
        if(cartData[serviceId]){
         delete cartData[serviceId]
        }
    
        await userDB.findOneAndUpdate({userID:req.userId},{cartData})
        res.json({success:true, message:"Delete from cart"})
    
      } catch (error) {
        res.json({ success: false, message: "Error delete from cart", details: error.message });
      }

    
}

const getCart = async (req,res) =>{
    try {
        let userData = await userDB.findOne({userID:req.userId});
        let cartData = await userData.cartData;

        res.json({success:true, cartData})
    } catch (error) {
        res.json({success:false, message:"Error to get cart", details: error.message})
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    deleteFromCart,
    getCart
}