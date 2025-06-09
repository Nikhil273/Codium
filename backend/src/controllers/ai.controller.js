const aiService = require('../Services/ai.services');


async function getReview(req, res) {
  const { code } = req.body;
  console.log(code);

  if (!code) return res.status(500).json({ "Error": "Please Provide the code" });

  const response = await aiService(code)
  if (response) {
    res.status(200).send(response)
  }

}

module.exports = getReview;

