const WilderModel = require("../models/Wilder");

module.exports = {
    create: async (req, res) => {
        try {
            await WilderModel.init()
            const newWilder = new WilderModel(req.body);

            const result = await newWilder.save();
            res.json({ success: true, result: result });
        } catch (err) {
            if (err.code === 11000) {
                res.status(400).json({ message: 'Name already taken' });
            } else {
                console.error(err);
                res.status(500).json({ message: 'db_error' });
            }
        }
    },

    findAll: async (req, res) => {
        try {
            const wilders = await WilderModel.find();
            res.json(wilders);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'server_error' });
        }
    },

    findOne: async (req, res) => {
        try {
            const wilder = await WilderModel.findById(req.params.id);
            res.json(wilder);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'server_error' });
        }
    },

    update: async (req, res) => {
        try {
            const wilder = await WilderModel.findById(req.params.id);
            if (wilder) {
                Object.assign(wilder, req.body);

                await wilder.save();
                res.json(wilder);
            } else {
                res.status(404).json({ message: 'not_found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'server_error' });
        }
    },

    delete: async (req, res) => {
        try {
            const wilder = await WilderModel.findById(req.params.id)
            await wilder.remove();
            res.json(wilder);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'server_error' });
        }
    },
};
