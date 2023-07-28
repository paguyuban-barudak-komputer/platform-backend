const Members = require("../models/Members");
const MemberPositions = require("../models/MemberPositions");
const Structurals = require("../models/Structurals");
const Periode = require("../models/Periode");
const path = require('path')
const fs = require('fs')
const config = require('../config')

module.exports = {
    
  index: async (req, res) => {
    try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
  
        const alert = { message: alertMessage, status: alertStatus}
        const members = await Members.find().populate(["memberPositionId", "structuralId", "periodeId"])
  
        res.render('members/index',{
          members,
          alert,
          title: 'Pengurus'
        })
      } catch (err) {
        console.log(err)
      }
  },

  create: async (req, res) => {
    try {
        const memberPositions = await MemberPositions.find();
        const structurals = await Structurals.find();
        const periode = await Periode.find();

        res.render("members/create", {
            memberPositions,
            structurals,
            periode,
            title: "Tambah Pengurus",
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        
        res.redirect("/members");
    }
  },

  store: async (req, res) => {
    try {
        const { nim, name, email, classes, gender, phone, address, instagram, member_position, structural, periode } = req.body;

        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/members/${filename}`)

            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)

            src.pipe(dest)

            src.on('end', async ()=>{
            try {

                const member = new Members({
                    nim,
                    name,
                    email,
                    classes,
                    gender,
                    phone,
                    address,
                    instagram,
                    memberPositionId: member_position,
                    structuralId: structural,
                    periodeId: periode,
                    photo: filename
                })

                await member.save();

                req.flash('alertMessage', "Berhasil menambahkan pengurus")
                req.flash('alertStatus', "success")
        
                res.redirect('/members')
                
            } catch (err) {
                req.flash('alertMessage', `${err.message}`)
                req.flash('alertStatus', 'danger')
                res.redirect('/members')
            }
            })
        } else {
            req.flash("alertMessage", "Pilih foto");
            req.flash("alertStatus", "danger");
      
            res.redirect("/members");
        }

    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/members");
    }
  },

  edit: async (req, res) => {
    try {
         const { id } = req.params;
         const member = await Members.findById(id).populate(["memberPositionId", "structuralId", "periodeId"]);
         const memberPositions = await MemberPositions.find();
         const structurals = await Structurals.find();
         const periode = await Periode.find();

         res.render("members/edit", {
            member,
            memberPositions,
            structurals,
            periode,
            title: "Edit Pengurus",
        });
      } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/members");
      }
  },

  update: async (req, res) => {
    try {
        const { id } = req.params;
        const { nim, name, email, classes, gender, phone, address, instagram, member_position, structural, periode } = req.body;

        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/members/${filename}`)
  
            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
  
            src.pipe(dest)
  
            src.on('end', async ()=>{
            try {
  
                const member = await Members.findOne({_id: id})
  
                let currentImage = `${config.rootPath}/public/members/${member.photo}`;
                if(fs.existsSync(currentImage)){
                  fs.unlinkSync(currentImage)
                }
  
                await Members.findOneAndUpdate({
                    _id : id
                  },{
                    nim,
                    name,
                    email,
                    classes,
                    gender,
                    phone,
                    address,
                    instagram,
                    memberPositionId: member_position,
                    structuralId: structural,
                    periodeId: periode,
                    photo: filename
                  })
  
                req.flash('alertMessage', "Berhasil mengedit pengurus")
                req.flash('alertStatus', "success")
        
                res.redirect('/members')
                
            } catch (err) {
                req.flash('alertMessage', `${err.message}`)
                req.flash('alertStatus', 'danger')
                res.redirect('/members')
            }
            })
        } else {
            await Members.findOneAndUpdate({
                _id : id
              },{
                nim,
                name,
                email,
                classes,
                gender,
                phone,
                address,
                instagram,
                memberPositionId: member_position,
                structuralId: structural,
              })
              
              req.flash('alertMessage', "Berhasil mengedit pengurus")
              req.flash('alertStatus', "success")
        
              res.redirect('/members')
        }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/members");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const member = await Members.findOneAndRemove({
        _id: id
      });

      let currentImage = `${config.rootPath}/public/members/${member.thumbnail}`;
      if(fs.existsSync(currentImage)){
        fs.unlinkSync(currentImage)
      }

      req.flash("alertMessage", "Berhasil menghapus pengurus");
      req.flash("alertStatus", "success");
      res.redirect("/members");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/members");
    }
  },
};