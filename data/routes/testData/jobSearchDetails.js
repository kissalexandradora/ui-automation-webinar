const express = require('express');
const router = express.Router();
const JobSearchDetail = require('../../models/testData/JobSearchDetails');

/**
 * Return all the jobSearchDetails.
 */
router.get('/', async (req, res) => {
    const jobSearchDetails = await JobSearchDetail.find();
    res.json(jobSearchDetails);
});

/**
 * Return a specific jobSearchDetail.
 */
router.get('/:jobSearchDetailId', async (req, res) => {
    const jobSearchDetail = await JobSearchDetail.findById(req.params.jobSearchDetailId);
    res.json(jobSearchDetail);
});

/**
 * Submit a jobSearchDetail.
 */
router.post('/', async (req, res) => {
    const jobSearchDetail = new JobSearchDetail({
        country: req.body.country,
        city: req.body.city,
        department: req.body.department,
        positionName: req.body.positionName
    });

    const savedJobSearchDetail = await jobSearchDetail.save();
    res.json(savedJobSearchDetail);
});

/**
 * Delete a specific jobSearchDetail
 */
router.delete('/:jobSearchDetailId', async (req, res) => {
    const removedPost = await JobSearchDetail.remove({ _id:req.params.jobSearchDetailId });
    res.json(removedPost);
})

module.exports = router;