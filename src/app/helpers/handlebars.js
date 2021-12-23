const Handlebars = require('handlebars');

module.exports = {
  indexSum: (a, b) => a + b, // Increase index to match view
  sortColumn: ( field, sort ) => {
      const sortType = field === sort.column ? sort.type : 'default';
      
      const texts = {
          default: 'Sort',
          asc: 'Desc',
          desc: 'Asc',
      };

      const types = {
          default: 'asc',
          asc: 'desc',
          desc: 'asc',
      };

      const text = texts[sortType];
      const type = types[sortType];

      const uri = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

      const safeString =  `<a href="${uri}">${text}</a>`;

      return new Handlebars.SafeString(safeString);
  }
}
