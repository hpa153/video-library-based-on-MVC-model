module.exports = {
  multipleObjectConverter: function(mongooseArray) {
    return mongooseArray.map(mongoose => mongoose.toObject());
  },

  singleObjectConverter: function(mongooseObject) {
    return mongooseObject ? mongooseObject.toObject() : mongooseObject;
  }
};