const Users = require("../models/Users");
const bcrypt = require('bcryptjs');

module.exports = {
    
  index: async (req, res) => {
    try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
  
        const alert = { message: alertMessage, status: alertStatus}
        const users = await Users.find()
  
        res.render('users/index',{
            users,
            alert,
            title: 'Pengguna'
        })
      } catch (err) {
       console.log(err)
      }
  },

  create: async (req, res) => {
    try {
        res.render("users/create", {
            title: "Tambah Pengguna",
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        
        res.redirect("/users");
    }
  },

  store: async (req, res) => {
    try {
        const { name, username, password, role } = req.body;

        const hashPassword = bcrypt.hashSync(password)

        await Users.create({ name, username, password: hashPassword, role })

        req.flash("alertMessage", "Berhasil menambahkan pengguna");
        req.flash("alertStatus", "success");

        res.redirect("/users"); 

    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/users");
    }
  },

  edit: async (req, res) => {
    try {
         const { id } = req.params;
         const user = await Users.findById(id);
         
         res.render("users/edit", {
            user,
            title: "Edit Pengguna",
        });
      } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/users");
      }
  },

  update: async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, password } = req.body;

        if(password.length != 0){
            const hashPassword = bcrypt.hashSync(password)

            await Users.findOneAndUpdate({
                _id: id
              },{ name, username, password: hashPassword });
        } else {
            await Users.findOneAndUpdate({
                _id: id
              },{ name, username });
        }
    
        req.flash("alertMessage", "Berhasil mengedit pengguna");
        req.flash("alertStatus", "success");
    
        res.redirect("/users");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/users");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Users.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus pengguna");
      req.flash("alertStatus", "success");
      res.redirect("/users");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/users");
    }
  },
};