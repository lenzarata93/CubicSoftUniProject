const uniqid = require('uniqid');
const Cube = require('../models/Cube');

exports.getAll =async(search,from,to) => {
    let result =await Cube.find().lean();

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
exports.getOne =(cubeId)=> Cube.findById(cubeId);



exports.create = async(cubeData) =>{
    const cube =new Cube(cubeData);
    await cube.save();

return cube;
};

exports.attachAccessory = async(cubeId,accessoryId)=>{
return Cube.findByIdAndUpdate(cubeId,{$push:{accessories: accessoryId}});
//const cube = await Cube.findById(cubeId);
//cube.accessories.push(accessoryId);
//return cube.save();
}