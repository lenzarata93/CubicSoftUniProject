const uniqid = require('uniqid');
const cubes = [{
    id:1,
    name: "mirror cube",
    description : 'coolll cubeee',
    imageUrl : 'https://media.istockphoto.com/id/483822467/photo/classic-rubiks-cube.jpg?s=1024x1024&w=is&k=20&c=qmNUzJD8FLESHFICuCngW0UhbETUEgUAirH4UAgdLEM=',
    difficultyLevel : 4
},
];
exports.getAll =(search,from,to) => {
    let result = cubes.slice();

    if(search){
        result=result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(from){
result.filter(cube => cube.difficultyLevel>=Number(from));
    }

    if(to){
result.filter(cube => cube.difficultyLevel<= Number(to));
    }
    return result;
};
exports.getOne =(cubeId)=> cubes.find(x => x.id == cubeId)
exports.create = (cubeData) =>{
const newCube= {
    id: uniqid(),
    ...cubeData,
};
cubes.push(newCube);
return newCube
};