let insertDocUtil = async (req, res, detailsToBeAdded, successMessage) => {
  try{
    await detailsToBeAdded.save()
    .then( record => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ data: record, message: successMessage});
      res.end()
    })
  }catch(e){
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: e.message });
    res.end();
  }
}

module.exports = insertDocUtil;