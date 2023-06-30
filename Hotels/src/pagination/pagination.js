async function paginate(items, req, res) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  if (endIndex < items.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0)
    results.previous = {
      page: page - 1,
      limit: limit,
    };
    // try {
    //     results.results = await model.find().limit(limit).skip(startIndex).exec()
    //     res.paginatedResults = results
    //     next()
    //   } catch (e) {
    //     res.status(500).json({ message: e.message })
    //   }
    if(isNaN(startIndex)){
      res.send(items);
        //return items;
    }
    else{
    
        results.results = items.slice(startIndex, endIndex);
         res.send(results);
        // return items.slice(startIndex, endIndex);
    }
  

}
//   export default paginate;
module.exports = paginate;
