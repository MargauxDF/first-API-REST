const WilderModel = require("../models/Wilder");

module.exports = {
    create: (req, res) => {
        WilderModel.init().then(() => {
            const wilder = new WilderModel(req.body);
            wilder
                .save()
                .then((result) => {
                    res.json({ success: true, result: result});
                })
                .catch((err) => {
                    res.json({ success: false, result: err});
                });
        });
    },

    findAll: (req, res) => {
        WilderModel.find()
            .then(result => {
                if (!result) res.json({ success: false, result: "No wilders found" })

                res.json({ success: true, result: result });
            })
            .catch((err) => {
                res.json({ success: false, result: err });
            });
    },

    findOne: (req, res) => {
        WilderModel.findById(req.params.id).then(wilder => {
            res.json(wilder);
        });
    },

    update: (req, res) => {
        WilderModel.findById(req.params.id).then((wilder) => {
            if(wilder) {
                Object.assign(wilder, req.body);

                wilder.save().then(() => {
                    res.json(wilder);
                })
                .catch((err) => {
                    res.json(err);
                })
            } else {
                res.status(404).json({ message: 'not_found' });
            }
        })
        .catch((err) => {
            res.json({ success: false, result: err });
        })
    },

    delete: (req, res) => {
        WilderModel.findById(req.params.id).then(wilder => {
            wilder.remove().then(wilder => {
                res.json(wilder); 
            });
        });
    },
};
