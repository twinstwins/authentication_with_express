module.exports = (req, res) =>{
  console.log("ログアウトしました")
  req.session.destroy(() =>{
  res.redirect('/') }
)}
