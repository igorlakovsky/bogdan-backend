require("dotenv").config();

const express = require("express");
const cors = require('cors')

const db = require('./db.js')

const Games = require('./models/games.js')
const Trends = require('./models/trends.js')
const Home = require('./models/home.js')

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors())

db.sync({ force: true })
  .then(async () => {

    await Home.create({
      image: 'home.png',
      logo: 'home-logo.png'
    })

    for (let index = 0; index < 3; index++) {
      await Trends.create().then(async (trend) => {
          await Games.create({
            name: 'Call of Duty®: Black Ops Cold War',
            text: 'Ubisoft',
            logo: 'trend-card.png',
            price: '5000',
          }).then((game) => {
            trend.setGame(game).catch(err=>console.log(err));
          }).catch(err=>console.log(err));
      }).catch(err=>console.log(err));
    }

    for (let index = 0; index < 20; index++) {
      await Games.create({
        name: 'Assassin’s Creed Valhalla',
        text: 'Ubisoft',
        logo: 'game-logo.jpg',
        price: '5000',
      }).catch(err=>console.log(err));
    }

    })
  .catch(error => console.error(error))

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  Home.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
});

app.get("/games", (req, res) => {
  Games.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
});

app.post("/new-game"), (req, res) => {
  const game = {
    name: req.body.title,
    text: req.body.text,
    logo: req.body.logo,
    price: req.body.price,
  };

  Games.create(game)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

app.get("/trends", (req, res) => {
  Trends.findAll({
    include: [{
      model: Games,
    }]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

//   Tutorial.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };