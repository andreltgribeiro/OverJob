const express = require('express')
const router = express.Router()
const Job = require('../Models/Job')
const verify = require('../Util/verifyToken')
const authorize = require('../Util/authorize')
const roles = require('../Util/roles')
const { jobValidation } = require('../Util/validation')

router.get('/', verify, authorize(), async (req, res) => {
    try {
        const jobs = await Job.find()
        res.json(jobs)
    } catch (error) {
        res.json({message: error})
    }
})

router.post('/', verify, authorize(roles.Writer), async (req, res) =>{

    const { error } = jobValidation(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    try{
        const job = new Job({
            author: req.body.author,
            description: req.body.description,
            active: req.body.active
        })
        
        const savedJob = await job.save()
        res.json(savedJob)

    }catch(error){
        res.json({message: error})
    }
})

router.patch('/:jobId', verify, authorize(roles.Writer), async (req, res) =>{
    try {
        const updateJob = await Job.updateOne(
            { _id: req.params.jobId },
            { $set : {active: req.body.active }
        })
        res.json(updateJob)
    } catch (error) {
        res.json({message: error})
    }
})
module.exports = router