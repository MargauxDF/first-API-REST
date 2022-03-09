const WilderModel = require("../models/Wilder");

module.exports = {
    create: async (req, res, next) => {
        try {
            WilderModel.init()
            const newWilder = new WilderModel(req.body);
            const result = await newWilder.save();
            res.json({ success: true, result: result });
        } catch (err) {
            if (err.code === 11000) {
                res.status(400).json({ message: 'Name already taken' });
            }
            throw error;
        }
    },

    findAll: async (req, res, next) => {
        const wilders = await WilderModel.find();
        res.json(wilders);
    },

    findOne: async (req, res, next) => {
        const wilder = await WilderModel.findById(req.params.id);
        res.json(wilder);
    },

    update: async (req, res, next) => {
        const wilder = await WilderModel.findById(req.params.id);
        if (wilder) {
            Object.assign(wilder, req.body);

            await wilder.save();
            res.json(wilder);
        } else {
            res.status(404).json({ message: 'not_found' });
        }
    },

    delete: async (req, res, next) => {
        const wilder = await WilderModel.findById(req.params.id)
        await wilder.remove();
        res.json(wilder);
    },
};
