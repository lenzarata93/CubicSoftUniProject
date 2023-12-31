const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const User = require('../models/User');

router.get('/create',(req,res)=>{
    console.log(cubeManager.getAll());
    console.log(req.user)
res.render('create');
});

router.post('/create',async (req,res)=>{
    const{name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user._id,
})
res.redirect('/');
});

router.get('/:cubeId/details', async(req,res)=>{
    const cube= await cubeManager.getOne(req.params.cubeId).lean();
    
    console.log(cube)
    if(!cube){
     return   res.redirect('/404')
    }
    res.render('details', {cube});
    });

    router.get('/:cubeId/attach-accessory',async (req,res)=>{
        const cube =await cubeManager.getOne(req.params.cubeId).lean();
        const accessories = await accessoryManager.getAll().lean();

        const hasAccessories = accessories.length>0;
res.render('accessory/attach',{cube,accessories,hasAccessories});
    });

    router.post('/:cubeId/attach-accessory',async (req,res)=>{
        const {accessory: accessoryId} = req.body;
        console.log(accessoryId)
        const cubeId = req.params.cubeId;

       await cubeManager.attachAccessory(cubeId,accessoryId);
       res.redirect(`/cubes/${cubeId}/details`);
    });

    router.get('/:cubeId/delete',async(req,res)=>{
       const cube  = await cubeManager.getOne(req.params.cubeId).lean();
        res.render('cubes/delete',{cube});

    })
    router.post('/:cubeId/delete',async (req,res)=>{
        await cubeManager.delete(req.params.cubeId);
        res.redirect('/');
    })

module.exports=router;