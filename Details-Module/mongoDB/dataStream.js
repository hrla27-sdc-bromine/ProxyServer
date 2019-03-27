const { Readable } = require ('stream');
const faker = require('faker');

faker.seed(22);

randNum = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
};

class DataStream extends Readable {
  constructor (options) {
    super (options);
    this.idCount = 0;
    this.possibleSizes = [
      '5',
      '5h',
      '6',
      '6h',
      '7',
      '7h',
      '8',
      '8h',
      '9',
      '9h',
      '10',
      '10h',
      '11',
      '11h',
      '12',
      '12h',
      '13'
    ];

    this.relatedColors = [];;
  }

  _read(size) {
    let product = {};

    //productId
    product.productId = this.idCount;

    if (!this.relatedColors.includes(this.idCount)) {
      this.relatedColors = [];
      let colorNum = randNum(1, 6); 
      for (let color = 0; color < colorNum; color++) {
        this.relatedColors.push(this.idCount+color);
      }
    }
    this.idCount++;
    
    //name
    product.name = faker.commerce.productName();
    
    //images
    let imageCount = randNum(5, 12);
    product.images = [];
    for (let i = 0; i < imageCount; i++) {
      product.images.push(
        'https://picsum.photos/1000/1000?image=' +
        ((this.idCount + i) % 1085));
    };

    //sizes
    product.sizes = {};
    for (let size of this.possibleSizes) {
      let sizeCount = randNum(0, 12)
      product.sizes[size] = sizeCount;
    };
    
    //retailPrice
    let retail = randNum(6, 22) * 10 ;
    product.retailPrice = retail;

    //salePrice
    product.salePrice = Math.floor(retail * Math.random());

    //reviewCount
    product.reviewCount = randNum(0, 1000);

    //reviewRating
    product.reviewRating = (Math.random() * 2.5 + 2.5);

    //tags
    product.tags = faker.commerce.department().split(' ');

    // //colors
    let colorCount = 3
    product.colors = [];
    for (let i = 0; i < colorCount; i++) {
      product.colors.push(faker.commerce.color());
    };

    //availableColors
    product.availableColors = [];
    let colorSize = this.relatedColors.length;
      for (let i = 0; i < colorSize; i++) {
        product.availableColors.push(this.relatedColors[i]);
      };

    //heartToggle
    product.heartToggle = false;
    
    if (this.idCount === 1) this.push('[');
    //   this.push(JSON.stringify(product) + (this.idCount === 14 ? ']' : ','));
    // if (this.idCount === 14) this.push(null);
    this.push(JSON.stringify(product) + (this.idCount === 1e7 ? ']' : ','));
    if (this.idCount === 1e7) this.push(null);
  }
}

module.exports = DataStream;
