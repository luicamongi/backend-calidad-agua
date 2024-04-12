const db = require("../models");
const Medicion = db.mediciones;
const Op = db.Sequelize.Op;

// Create and Save a new Medicion
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Parametro) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
    return;
  }

  // Create a Medicion
  const medicion = {
    Parametro: req.body.Parametro,
    Valor: req.body.Valor,
    Ubicacion: req.body.Ubicacion
  };

  // Save Medicion in the database
  Medicion.create(medicion)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algun error ocurrio cuando creo la Medicion."
      });
    });
};

// Retrieve all Mediciones from the database.
exports.findAll = (req, res) => {
  const Parametro = req.query.Parametro;
  var condition = Parametro ? { Parametro: { [Op.iLike]: `%${Parametro}%` } } : null;

  Medicion.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algun error ocurrio cuando estaba recuperando Mediciones."
      });
    });
};

// Find a single Medicion with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Medicion.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede hallar medicion con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error recuperando medicion con id=" + id
      });
    });  
};

// Update a Medicion by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Medicion.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Medicion fue actualizada con exito."
        });
      } else {
        res.send({
          message: `No puede actualizar medicion con id=${id}. Quiza medicion no fue encontrado  o req.body esta vacio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando medicion con id=" + id
      });
    });  
};

// Delete a Medicion with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Medicion.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Medicion fue borrada exitosamente!"
        });
      } else {
        res.send({
          message: `No puede borrar medicion con id=${id}. Quiza medicion no fue encontrada!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se puede borrar medicion con id=" + id
      });
    });  
};

// Delete all Mediciones from the database.
exports.deleteAll = (req, res) => {
  Medicion.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Los tutoriales fueron eliminados exitosamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algun error ocurrio cuando estaba removiendo todos las mediciones."
      });
    });
};

// find all Parametro medicion
exports.findAllParametro = (req, res) => {
  Medicion.findAll({ where: { Parametro: "" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algun error ocurrio mientras se encontraban mediciones."
      });
    });
};
