const Book = require('./../../../models/book.model')
const {CODE} = require('./../../../config/constants')
const l10n = require('jm-ez-l10n');
const logger = require('./../../../helper/logger.js');
const mongoose = require('mongoose')
const bookUtils = {}

bookUtils.addBook = async (bookInfo) => {
    try {
        logger.info('******** INFO :: Book Utils - addBook :: ********');
        const book = Book(bookInfo)
        const newBook = await book.save();
        return newBook;
    } catch (error) {
        logger.info('******** ERROR :: Book Utils - addBook :: ********');
        logger.error(error);
        const errorObj = {code: CODE.ERROR.INTERNAL_SERVER_ERROR, error: l10n.t('ERR_INTERNAL_SERVER')}
        throw errorObj
    }
}

bookUtils.checkBookExists = async (condition) => {
    try {
        const book = await Book.findOne(condition);
        if (book) {
            return true
        }
        return false
    } catch (error) {
        logger.info('******** ERROR :: Book Utils - checkExist :: ********');
        logger.error(error)
        const errorObj = {code: CODE.ERROR.INTERNAL_SERVER_ERROR, error: l10n.t('ERR_INTERNAL_SERVER')}
        throw errorObj
    }
}

bookUtils.list = async (bookInfo) => {
    try {
    logger.info('******** INFO :: Book Utils - listBooks :: ********');
        const {page, limit, userId} = bookInfo;
        const books = await Book.find({userId: mongoose.Types.ObjectId(userId)}, {}, {lean: true}).skip(page * limit).limit(limit).sort({createdAt: -1})
        if (!books.length) {
            const errObj = {code: CODE.ERROR.NOT_FOUND, error: l10n.t('ERR_NO_BOOKS_FOUND')}
            throw errObj
        }
        const count = await Book.countDocuments({userId: mongoose.Types.ObjectId(userId)});
        return {books, count};
    } catch (error) {
        logger.info('******** ERROR :: Book Utils - getList :: ********');
        logger.error(error)
        const errorObj = {code: CODE.ERROR.INTERNAL_SERVER_ERROR, error: l10n.t('ERR_INTERNAL_SERVER')}
        throw errorObj
    }
}

module.exports = bookUtils
