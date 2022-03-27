let insertDocUtil = async (req, res, detailsToBeAdded, successMessage) => {
  try{
    await detailsToBeAdded.save()
    .then( () => {
      res.redirect('/login');
      // res.status(200).json({ is_error: false, message: successMessage});
    })
  }catch(e){
    res.json({ is_error: true, error: e.message });
  }
}

module.exports = insertDocUtil;