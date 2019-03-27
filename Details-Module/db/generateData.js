const faker = require('faker');
const fs = require('fs');

faker.seed(22);

const randomNum = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
};

let colorArr = [];

let idCount = 0;
for (let i = 0; i < 3; i++) {
  let data = [];
  for (let j = 0; j < 2; j++) {
    let product = {};
    product.productId = idCount;
    idCount += 1;
    product.name = faker.commerce.productName();
    product.images = [];
    let imageCount = randomNum(5, 12);
    for (let k = 0; k < imageCount; k++) {
      product.images.push(
        'https://picsum.photos/1000/1000?image=' + ((j + k) % 1085)
      );
    }

    product.sizes = {};
    const possibleSizes = [
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
    for (let size of possibleSizes) {
      let sizeCount = randomNum(0,12)
      product.sizes[size] = sizeCount;
    }
    product.retailPrice = randomNum(6, 22) * 10;
    product.salePrice = Math.floor(product.retailPrice * Math.random());
    product.reviewCount = randomNum(0, 1000);
    product.reviewRating = (Math.random() * 2.5 + 2.5),
    product.tags = faker.commerce.department().split(' ');
    product.colors = [];
    for (let j = 0; j < 3; j++) {
      product.colors.push(faker.commerce.color());
    }
    if (!colorArr.includes(product.productId)) {
      product.availablecolors = colorArr.slice() 
      } else {
        colorArr = []
        let colorCount = randomNum(1, 7);
        for (let a = 0; a < colorCount; a++) {
          colorArr.push(product.productId+a)
      }
      product.availablecolors = colorArr.slice()
    }
    product.heartToggle = false;

    data.push(product);
  }
  
  fs.writeFileSync(`./db/data1/${i}.json`, JSON.stringify(data));
}
