const Thing = require("../models/Thing");

exports.like = (req,res,next) => {
    // Récuptération Id sauce
    idSauce = req.baseUrl.split("/")[3];
    console.log(idSauce);

                        
            // Si c'est un like
            if (req.body.like == 1) {
                Thing.updateOne({_id : idSauce},
                    {
                        $push:{usersLiked: req.body.userId},
                        $inc : {likes : +1}
                    }
                    )
                .then(() => res.status(200).json({message : 'sauce aimée'}))
                .catch(err => res.status(400).json({err}))
                }    
                
            // Si c'est un like
            if (req.body.like == -1) {
                Thing.updateOne({_id : req.params.id},
                    {
                        $push:{arrayUsersDisliked: req.body.userId},
                        $inc : {dislikes : +1}
                    }
                    )
                .then(() => res.status(200).json({message : 'sauce aimée'}))
                .catch(err => res.status(400).json({err}))
                }
            
        
       
        
    
}