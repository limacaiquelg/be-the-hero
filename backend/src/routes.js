const express = require('express');
const authMiddleware = require('./middlewares/auth');

const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const noAuthRoutes = express.Router();

noAuthRoutes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        password: Joi.string().required(),
    }),
}), SessionController.create);

noAuthRoutes.get('/ongs', OngController.index);

noAuthRoutes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required().min(3).max(32),
        password: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().length(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), OngController.create);

noAuthRoutes.get('/ongs/verifyId/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    }),
}), OngController.verifyId);

noAuthRoutes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);

const authRoutes = express.Router();
authRoutes.use(authMiddleware);

authRoutes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

authRoutes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required().min(0.01),
    }),

    [Segments.HEADERS]: Joi.object({
        'content-type': Joi.string().required().equal('application/json'),
        authorization: Joi.string().required(),
    }).unknown(),
}), IncidentController.create);

authRoutes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), IncidentController.delete);

module.exports = { noAuthRoutes, authRoutes };
