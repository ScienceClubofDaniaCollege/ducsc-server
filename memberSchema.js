const memberSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: String,
    batch: String,
    shift: String,
    section: String,
    password: String});

    const Member = mongoose.model('Members', memberSchema);