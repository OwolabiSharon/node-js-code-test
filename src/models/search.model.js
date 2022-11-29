const mongoose = require('mongoose');
const { paginate } = require('./plugins');

const SearchSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  searchType: {
    type: String,
  },
  search: {
    type: String,
  },
},
{
  timestamps: true,
});

SearchSchema.plugin(paginate);

const Search = mongoose.model('Search', SearchSchema);

module.exports = Search;
