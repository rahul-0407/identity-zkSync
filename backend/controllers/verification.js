// controllers/verificationController.js
import Verification from '../models/verification.js';

export const getVerifications = async (req, res) => {
  try {
    const { filter = 'allTime', sort = 'desc' } = req.query;

    let dateFilter = {};

    const now = new Date();
    switch (filter) {
      case 'lastDay':
        dateFilter = { verifiedAt: { $gte: new Date(now.getTime() - 24*60*60*1000) } };
        break;
      case 'lastMonth':
        dateFilter = { verifiedAt: { $gte: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()) } };
        break;
      case 'lastYear':
        dateFilter = { verifiedAt: { $gte: new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()) } };
        break;
      case 'allTime':
      default:
        dateFilter = {};
    }

    const verifications = await Verification.find(dateFilter)
      .sort({ verifiedAt: sort === 'asc' ? 1 : -1 })
      .limit(50); // limit to latest 50 records

    res.json(verifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST route to add a new verification
export const addVerification = async (req, res) => {
  try {
    const { ownerAddress, ownerName } = req.body;

    if (!ownerAddress || !ownerName) {
      return res.status(400).json({ message: 'ownerAddress and ownerName are required' });
    }

    const newVerification = new Verification({
      ownerAddress,
      ownerName,
      verifiedAt: new Date()
    });

    await newVerification.save();

    res.status(201).json({ message: 'Verification saved', verification: newVerification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const logScannedQr = async (req, res) => {
  try {
    const { qrData } = req.body;
    console.log('QR scanned:', qrData); // logs in backend terminal
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

