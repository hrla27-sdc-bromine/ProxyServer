const { Readable } = require('stream');
const faker = require('faker');
faker.seed(22);

class DataStream extends Readable {
  constructor(options) {
    super(options);
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
    this.availableColors = [];
  }

  randNum (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }

  _read(size) {
    this.idCount++;
    if (!this.availableColors.includes(this.idCount)) {
      this.availableColors = [];
      let colorNum = this.randNum(1, 6); 
      for (let color = 0; color < colorNum; color++) {
        this.availableColors.push(this.idCount+color);
      }
    }
    let product = {};
    product.name = faker.commerce.productName();
    product.images = [];
    let imageCount = this.randNum(5, 12);
    for (let i = 0; i < imageCount; i++) {
      product.images.push('https://picsum.photos/1000/1000?image=' + 
      ((this.idCount + i) % 1085));
    };
    product.images = '"{' + product.images.toString() + '}"';
    product.sizes = {};
    for (let size of this.possibleSizes) {
      let sizeCount = this.randNum(0, 12)
      product.sizes[size] = sizeCount;
    };
    product.sizes = '"' + JSON.stringify(product.sizes).replace(/"/g, '""') + '"';
    product.retailPrice = this.randNum(7, 22) * 10;
    product.salePrice = Math.floor(product.retailPrice * Math.random());
    product.reviewCount = this.randNum(1, 1000);
    product.reviewRating = Math.random() * 2.5 + 2.5;
    product.tags = [];
    let tagCount = this.randNum(1, 4);
    for (let i = 0; i < tagCount; i++) {
      product.tags.push(faker.commerce.department());
    };
    product.tags = '"{' + product.tags.toString() + '}"';
    product.colors = [];
    let colorCount = this.randNum (1, 6);
    for (let i = 0; i < colorCount; i++) {
      product.colors.push(faker.commerce.color());
    };
    product.colors = '"{' + product.colors.toString() + '}"';
    product.availableColors = [];
    for (let color of this.availableColors) {
      product.availableColors.push(color);
    };
    product.availableColors = '"{' + product.availableColors.toString() + '}"'
    product.heartToggle = false; 
    this.push(Object.values(product).toString() + '\n');
    if (this.idCount % 1e6 === 0) console.log (this.idCount);
    if (this.idCount === 1e7) this.push(null);
  }
}

module.exports = { DataStream };



//     //productId
//     product += this.idCount + ','; 
//     if (!this.availableColors.includes(this.idCount)) {
//       this.availableColors = [];
//       let colorNum = this.randNum(1, 6); 
//       for (let color = 0; color < colorNum; color++) {
//         this.availableColors.push(this.idCount+color);
//       }
//     }
//     this.idCount++;
    
//     //name
//     product += faker.commerce.productName() + ',';
    
//     //images
//     let imageCount = this.randNum(5, 12);
//     product += '"{';
//     for (let k = 0; k < imageCount; k++) {
//       product +=
//         'https://picsum.photos/1000/1000?image=' +
//         ((this.idCount + k) % 1085) +
//         (k === imageCount - 1 ? '}",' : ',');
//     };

//     //sizes
//     let sizes = {};
//     for (let size of this.possibleSizes) {
//       let sizeCount = this.randNum(0, 12)
//       sizes[size] = sizeCount;
//     };
//     product += '"' + JSON.stringify(sizes).replace(/"/g, '""') + '"' + ',';
    
//     //retailPrice
//     let retailPrice = this.randNum(6, 22) * 10 ;
//     product += retailPrice + ',';

//     //salePrice
//     product += Math.floor(retailPrice * Math.random()) + ',';

//     //reviewCount
//     product += this.randNum(1, 1000) + ',';

//     //reviewRating
//     product += Math.random() * 2.5 + 2.5 + ',';

//     //tags
//     product += '"{' + faker.commerce.department() + '}",';

//     // //colors
//     let colorCount = 3
//     product += '"{';
//     for (let k = 0; k < colorCount; k++) {
//       product += faker.commerce.color() +  (k === colorCount - 1 ? '}",' : ',');
//     };

//     //availableColors
//     let colorSize = this.availableColors.length;
//     product += '"{';
//       for (let i = 0; i < colorSize; i++) {
//         product += this.availableColors[i] + (i === colorSize - 1 ? '}",' : ',');
//       };

//     //heartToggle
//     product += 'false';
    
//     this.push(product + '\n');
//     if (this.idCount === 1e7) this.push(null);
//     // if (this.idCount === 10) this.push(null)
//   }
// }