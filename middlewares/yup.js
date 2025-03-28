const yupValidator = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        return next();
    } catch (error) {
        // console.log( error)
        return res.status(400).json({ error: true, message: error.errors[0]});
    }
};

yupValidator.array = (schema) => async (req, res, next) => {
    try {
        // console.log(req.body);
        await Promise.all(req.body.map((item, index) => schema.validate({ body: item }, { context: { index } })));
        return next();
    } catch (error) {
        // console.log(error);
        return res.status(400).json({ error: true, message: error.errors[0] });
    }
};

module.exports = {yupValidator};