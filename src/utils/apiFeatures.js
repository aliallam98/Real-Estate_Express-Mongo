const ApiFeatures = (reqQuery) => {
  let { searchTerm, sort, order, page, limit, fields, ...filters } = reqQuery;
  let query = {};
  // Search
  if (searchTerm && searchTerm !== "") {
    query.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ];
  }
  // Filter
  if (filters) {
    let queryFiltersCopy = { ...filters };
    queryFiltersCopy = JSON.parse(
      JSON.stringify(queryFiltersCopy).replace(
        /(gt|gte|lt|lte)/g,
        (match) => `$${match}`
      )
    );
    query = { ...query, ...queryFiltersCopy };
  }

  sort = reqQuery.sort || "createdAt";
  order = reqQuery.order || "desc";

  // Pagination
  // page = parseInt(page)
  if (page <= 0 || !page) page = 1;



  // limit = parseInt(limit)
  if (limit <= 0 || !limit) limit = 5;
  const skip = (page - 1) * limit;

  return {
    query,
    page,
    skip,
    limit,
    sort,
    order,
    fields,
  };
};

export default ApiFeatures;
