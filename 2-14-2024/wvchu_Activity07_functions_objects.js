
function maxOfTwo(n1, n2) {
    if (n1 > n2)
        return n1;
    if (n2 > n1)
        return n2;
    return n1;
}

function maxOfArray(array) {
    if (array.length == 0) {
        return 0;
    }
    var largest = array[0];
    for(var i = 1; i < array.length; i++) {
        if (largest < array[i]) {
            largest = array[i];
        }
    }
    return largest;
}

function showProperties(movie) {
    console.log("List of Keys :");
    for (let key in movie) {
        console.log(key);
    }
    console.log("List of Values :");
    for (let key in movie) {
        console.log(movie[key]);
    }
}

const circle = {
    radius: 2,
    area: function () {
        return Math.PI * this.radius * this.radius;
    }
}

let circle2 = {
    radius: 2,
    area: function () {
        return Math.PI * this.radius * this.radius;
    },
    set radiusValue(num) {
        this.radius = num;
    },

    get radiusValue() {
        return this.radius;
    }
}

let circle3 = {
    radius: 2,
    area: function () {
        return Math.PI * this.radius * this.radius;
    },

    setRadiusValue: function(num) {
        this.radius = num;
    },

    getRadiusValue: function() {
        return this.radius;
    }
}

let n1 = 11;
let n2 = 10;
console.log(`The max between ${n1} and ${n2} is :`, maxOfTwo(n1,n2));

let array = [10,11,1024,125,9,201];
console.log(maxOfArray(array));

// Object :
const movie = {
    title : 'Some movie',
    releaseYear: 2018,
    rating: 4.5,
    director: 'Steven Spielberg'
};
showProperties(movie);

console.log(circle.area());

console.log(`Area with ${circle2.radiusValue} :`, circle2.area());
circle2.radiusValue = 3;
console.log(`Area with ${circle2.radiusValue} :`, circle2.area());

console.log(`Area with ${circle3.getRadiusValue()} :`,circle3.area());
circle3.setRadiusValue(3);
console.log(`Area with ${circle3.getRadiusValue()} :`,circle3.area());