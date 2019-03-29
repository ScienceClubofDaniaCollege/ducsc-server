const imgur = require('imgur');

imgur.setClientId('4cdc8820814891c');

const uploadFromUrl = () => {
    imgur.uploadUrl('https://octodex.github.com/images/topguntocat.png')
    .then(function (json) {
        console.log(json.data.link);
        return json.data.link;
    })
    .catch(function (err) {
        console.error(err.message);
    });
};

const uploadImg = async (imgPath) => {
    const result = await imgur.uploadFile(imgPath).then((json) => {return json.data.link;}).catch((err) => {console.error(err.message);});
    return result;
}

exports.uploadImg = uploadImg;
exports.uploadFromUrl = uploadFromUrl;