const db = require('../../database/connection')
var moment = require('moment');
const {postMapper, getAllMapper, findByIdMapper, updateMapper} = require('../mappers/bookMapper')
exports.getAll = async (request,response)=>{
    try {
        var reqData = request.query;
        var pagination = {};
        var per_page = reqData.page.limit || 10;
        var page = reqData.page.offset || 1;
        if (page < 1) page = 1;
        var offset = (page - 1) * per_page;
        return Promise.all([
            db.count('* as count').from("books").first(),
            db.select("*").from("books").offset(offset).limit(per_page)
        ]).then(([total, rows]) => {
            var count = total.count;
            var rows = rows;
            pagination.meta = {
                count:per_page,
                total:count,
                to:offset + rows.length,
                from:offset,
                last_page:Math.ceil(count / per_page),
                current_page:page
            }
            // pagination.total = count;
            // pagination.per_page = per_page;
            // pagination.offset = offset;
            // pagination.to = offset + rows.length;
            // pagination.last_page = Math.ceil(count / per_page);
            // pagination.current_page = page;
            // pagination.from = offset;
            pagination.data = rows;    
            pagination.links = {
                first : `http://localhost/books?page[limit]=${reqData.page.limit}&page[offset]=${reqData.page.offset}`,
                next : `http://localhost/books?page[limit]=${reqData.page.limit}&page[offset]=${reqData.page.offset+10}`,
                last : `http://localhost/books?page[limit]=${reqData.page.limit}&page[offset]=${reqData.page.offset+10*10}`,
                prev : null
            }        
            response.status(201).json(pagination)    
        });    
    } catch (error) {
        return response.status(500).json({status:500,message:error.message})
    }    
}

exports.getFindById = async (request,response)=>{
    try {
        const {bookId} = request.params
        const fetchData = await db('category_books')
            .join('books','id_book','books.id')
            .join('category','category.id','id_category')
            .where('id_book',bookId)
        const map = findByIdMapper(fetchData,bookId)
        return response.status(201).json(map)
    } catch (error) {
        return response.status(500).json({status:500,message:error.message})
    }
}

exports.updateBulk = async (request,response)=>{
    try {
        const {bookId} = request.params
        const data = request.body.data
        var cr = [];
        var idc = [];
        data.map((val) =>{
            idc.push(val.id_category)
            cr.push(val.attributes.change_category)
        })
        for (let i = 0; i < cr.length; i++) {
            await db('category_books')
                .where('id_book',bookId)
                .where('id_category',idc[i])
                .update({
                  id_category:cr[i]  
                })
        }
        const fetchData = await db('category_books')
            .join('books','id_book','books.id')
            .join('category','category.id','id_category')
            .where('id_book',bookId)
        return response.status(200).json({data:fetchData})
    } catch (error) {
        return response.status(500).json({status:500,message:error.message})
    }
}

exports.post = async (request,response)=>{
    try {        
        const path = request.baseUrl
        const {id_category,book_name,writer,publisher,date_publish} = request.body.data.attributes
        const format2 = "YYYY-MM-DD"
        var date2 = new Date();
        var dateTime2 = moment(date2).format(format2);
        const book = await db('books').insert([{
            book_name:book_name,
            writer:writer,
            publisher:publisher,
            date_publish:date_publish,
            created_at:dateTime2
        }])
        const categoryBook = await db('category_books').insert([{
            id_book:book[0],
            id_category:id_category,
        }])

        const fetchData = await db('category_books')
            .rightJoin('books','id_book','books.id')
            .rightJoin('category','category.id','id_category')
            .where('id_book',book)
            .andWhere('id_category',id_category)
            .first()
        fetchData['links'] = "http://localhost/"+path+"/"+book
        
        var map = postMapper(fetchData)
        
        return response.status(201).json(map)

        // console.log(fetchData)
        
    } catch (error) {
        return response.status(500).json({status:500,message:error.message})
    }
}

exports.update = async (request,response)=>{
    try {
        const {bookId, categoryId} = request.params
        const {id_category,book_name,writer,publisher,date_publish} = request.body.data.attributes
        const format2 = "YYYY-MM-DD"
        var date2 = new Date();
        var dateTime2 = moment(date2).format(format2);
        const book = await db('books').where('id',bookId).update({
            book_name:book_name,
            writer:writer,
            publisher:publisher,
            date_publish:date_publish,
            updated_at:dateTime2
        })
        const categoryBook = await db('category_books')
        .where('id_book',bookId)
        .where('id_category',categoryId)
        .update({
            id_category:id_category,
        })

        const fetchData = await db('category_books')
            .rightJoin('books','id_book','books.id')
            .rightJoin('category','category.id','id_category')
            .where('id_book',bookId)
            .andWhere('id_category',id_category)
            .first()
        const map = updateMapper(fetchData,bookId)
        return response.status(201).json(map)
    } catch (error) {
        return response.status(500).json({status:500,message:error.message})
    }
}

exports.delete = async (request,response)=>{
    try {
        const {bookId} = request.params
        const fetchData = await db('books')
            .where('id',bookId)
            .delete()        
        return response.status(201).json({
            "status":200
        })
    } catch (error) {
        return response.status(500).json({status:500,message:error.message})
    }
}