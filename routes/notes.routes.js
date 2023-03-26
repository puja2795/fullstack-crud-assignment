const express = require("express");
const {NoteModel} = require("../models/note.model")

const noteRouter = express.Router();

noteRouter.get("/", async (req,res) => {
    // console.log(req.body);
    try{
        const notes = await NoteModel.find({userId:req.body.userId});
        res.status(200).send(notes)
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

noteRouter.post("/add", async (req,res) => {
    try{
        const payload = req.body;
        const note = new NoteModel(payload)
        await note.save()
        res.status(200).send({"msg":"A New Notre Has Been Added"})
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

noteRouter.patch("/update/:noteID", async(req,res) => {
    const {noteID} = req.params;
    const payload = req.body
    try{
        await NoteModel.findByIdAndUpdate({_id:noteID},payload)
        res.status(200).send({"msg":"Note has been updated"})
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

noteRouter.delete("/delete/:noteID", async(req,res) => {
    const {noteID} = req.params;
    try{
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.status(200).send({"msg":"Note has been deleted"})
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={noteRouter}