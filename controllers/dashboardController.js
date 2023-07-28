module.exports = {
  index: async (req, res) => {
    try {
        res.render('dashboard/index', {
            name: req.session.user.name,
            title: 'Dashboard'
          })
    } catch (err) {
        console.log(err)
    }
  },
};