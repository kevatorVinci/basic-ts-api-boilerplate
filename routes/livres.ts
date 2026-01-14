
import { Router } from "express";
import { isNewLivre, isUpdateLivre } from "../utils/type-guards";

import { createdLivre,getAllLivre,getIDLivre,deleteLivre,updateLivre } from "../services/livres";

const router = Router();

router.get("/",(req,res)=>{
const level= req.query["level"]as string;

const livres=getAllLivre(level);
return res.json(livres);
});

router.get("/:id",(req,res)=> {
const id = String(req.params.id);
const livre=getIDLivre(id);

if(!livre){
   return res.status(404).json({message:"not found"});
}

return res.json(livre);
});

router.post("/",(req,res)=>{
const body :unknown=req.body;

if(!isNewLivre(body)){
    return res.sendStatus(400);
}

const newLivre =  createdLivre(body);
return res.status(201).json(newLivre);

});

router.delete("/:id",(req,res)=>{
    const id=String(req.params.id);
    const deletedLivre=deleteLivre(id);

    if(!deletedLivre){
    return res.status(404).json({ message: "Livre not found" });

    }
    return res.sendStatus(204);
})

router.put("/:id",(req,res)=>{
       const id=String(req.params.id);
       const body : unknown=req.body;

       if(!isUpdateLivre(body)){
        return res.sendStatus(400);
       }

       const updatedLivre=updateLivre(id,body);

    if(!updatedLivre){
    return res.status(404).json({ message: "Livre not found" });
    }
    return res.json(updatedLivre);
});

export default router;

