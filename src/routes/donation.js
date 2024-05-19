import express from 'express'
const router = express.Router()
import DonationController from '../controller/donation.js'
import UserGaurd from '../middleware/UserGaurd.js'

router.get('/',DonationController.getAllDonations)
router.get('/:id',DonationController.getDonationById)
router.post('/',DonationController.createDonation)
router.put('/:id',DonationController.editDonation)
router.delete('/:id',DonationController.deleteDonation)

export default router