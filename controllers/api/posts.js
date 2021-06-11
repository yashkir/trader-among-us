function index(req, res) {
  res.json("hit posts/index");
}

function show(req, res) {
  res.json("hit posts/show");
}

function create(req, res) {
  res.json("hit posts/create");
}

function update(req, res) {
  res.json("hit posts/update");
}

function _delete(req, res) {
  res.json("hit posts/delete");
}

module.exports = {
  index,
  show,
  create,
  update,
  delete: _delete,
}
