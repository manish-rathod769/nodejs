let insertDocUtil = async (req, res, detailsToBeAdded, successMessage) => {
  try{
    await detailsToBeAdded.save()
    .then( record => {
      res.status(200).json({ data: record, message: successMessage});
    })
  }catch(e){
    res.status(404).json({ error: e.message });
  }
}

module.exports = insertDocUtil;