const getPagingData = (data, page, limit) => {
    var totalItems = data.count;
    var data = data.rows;
    const currentPage = page ? page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, data, totalPages, currentPage };
};

module.exports ={getPagingData}