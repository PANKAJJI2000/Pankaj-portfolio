import Contact from '../models/Contact.js';

export const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body.contact;

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.redirect('/?success=true');
    } catch (err) {
        res.redirect('/?success=false');
    }
};