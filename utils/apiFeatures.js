class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //$ Filtering
    //? Spreading the request.query object to destructure it and put it back
    //? into an object.
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //$ Filter by using comparison operators
    //? Convert the query object to a string.
    let queryStr = JSON.stringify(queryObj);

    //? Use the replace method and a regular expression to add the Mongo
    //? operator ($) in front of the query string operator (gte, gt, lte, lt)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //? Build the query...
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    //$ Sorting by Price (Lowest to highest)
    //? Change the value of "query" if the query string contains a sort object.
    if (this.queryString.sort) {
      //* Since the value for the "sort" key in the query object(req.query.sort)
      //* is price, we will be sorting by price.
      //# Now we are sorting by multiple items. We first need to convert the
      //# query string to remove the comma. We use the split() method which
      //# creates an array of the items we select in the query string. Then we
      //# use the join() method to create a string with the items separated by a
      //# space.
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      //? This else will run if the user does not add a sort to their query.
      //? The default will be to sort so that the most recently created tours
      //? will display first.
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    //$ Limiting the Fields Requested
    //? Changing the value of the query variable if the query contains the word
    //? fields.
    if (this.queryString.fields) {
      //# The query object in this case will have fields set as the key with the
      //# the value of the fields key set to a string with the values separated
      //# by commas of the items queried. We need to update that string of items separated by commas to a string separated by spaces.
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      //* We are going to exclude the __v field from the query object.
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    //$ Setting up Pagination
    //? Setting the default value of the page to page 1.
    const page = +this.queryString.page || 1;
    //? Setting the default value of the limit of results that will be returned.
    const limit = +this.queryString.limit || 100;
    //? Formula to calculate the number of documents that will be skipped in
    //? order to get to the page with the documents requested in the query string.
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
