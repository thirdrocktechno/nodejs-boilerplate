const bookUtils = require('./bookUtils')
const {CODE, PAGER} = require('../../../config/constants')

const bookCtr = {}

bookCtr.addBook = async (req, res) => {
    try {
        const {
            title, description, isbn, genre, price, totalPages, publication, publishedAt
        } = req.body;
        const userId = req.user._id;

        const bookInfo = {
            title,
            description,
            isbn,
            genre,
            price,
            totalPages,
            publication,
            publishedAt: new Date(publishedAt).toISOString(),
            userId
        }

        const isBookExist = await bookUtils.checkBookExists({'isbn':isbn, isActive: true});
        if (isBookExist) {
            return res.status(CODE.ERROR.BAD_REQUEST).json({error: req.t('ERR_BOOK_ALREADY_EXIST')})
        }
        const newBook = await bookUtils.addBook(bookInfo)
        return res.status(CODE.CREATED).json({message: req.t('MSG_BOOK_ADDED'), data:{id: newBook.id}})
    } catch (error) {
        return res.status(error.code || CODE.ERROR.INTERNAL_SERVER_ERROR).json({error: error.error || req.t('ERR_INTERNAL_SERVER')})
    }
}

bookCtr.list = async (req, res) => {
    try {
        const {
            page, limit
        } = req.query;
        const userId = req.user._id;

        const bookInfo = {
            page: page || PAGER.PAGE,
            limit: limit || PAGER.LIMIT,
            userId
        }
        const books = await bookUtils.list(bookInfo)
        return res.status(CODE.SUCCESS).json({message: req.t('MSG_BOOK_LIST_RETRIEVED'), data:books})
    } catch (error) {
        return res.status(error.code || CODE.ERROR.INTERNAL_SERVER_ERROR).json({error: error.error || req.t('ERR_INTERNAL_SERVER')})
    }
}

module.exports = bookCtr;
