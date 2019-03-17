const createMember = async (memberInfo) => {
    let member = new Member(memberInfo);
    const result = await member.save();
    console.log(result);
};

app.post('/register', (req, res) => {
    console.log(req.body);      
    createMember(req.body);
    res.send(`<h3 align="center" style="background-color:pink;"> Hi <em>${req.body.lname}</em> thank you for registering</h3>Your submitted data has been collected. Check them out bellow.<br>` +
    JSON.stringify(req.body));
});