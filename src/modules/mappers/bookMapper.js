exports.getAllMapper = (data)=>{
    return{
        meta:{
            count:data.limit,
            total:data.data.length
        },
        data:data.data,
        link:{
            first:data.first,
            next:data.next,
            last:data.last,
            prev:null
        }
    }
}

exports.postMapper = (data)=>{
    return {
        data:{
            "type":"books",
            "id":data.id_book,
            "attributes":{
                book_name:data.book_name,
                writer:data.writer,
                publisher:data.publisher,
                date_publish:data.date_publish,
                category_name:data.category_name,
                created_at:data.created_at,
                updated_at:data.updated_at
            },
            "links":{
                self:data.links
            }
        }
    }
}

exports.findByIdMapper = (data,bookId)=>{
    return {
        data:{
            type:"books",
            id:bookId,
            attributes:data,
            links:"http://localhost:5000/books/"+bookId
        }
    }
}

exports.updateMapper = (data,bookId)=>{
    return {
        data:{
            type:"books",
            id:bookId,
            attributes:data,
            links:"http://localhost:5000/books/"+bookId
        }
    }
}