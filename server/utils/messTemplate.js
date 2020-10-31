const generateMessage = ({ from, mess }) => {
  return {
    from,
    mess,
    createdAt: Date.now()
  };
};

const generateLocation = ({ from, lat, lng }) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: Date.now()
  };
};
module.exports = {
  generateMessage,
  generateLocation
};
