import * as joi from 'joi';


export const schema = {
    createArticle: joi.object().keys({
        title: joi.string().required(),
        slug: joi.string().required().min(3).max(3).alphanum().allow("-"),
        published_at: joi.date(),
        private: joi.boolean()
    })
}