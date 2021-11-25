const axios = require("axios");

// Trae una lista de juegos, consultada del api de Twitch
exports.getGames = async () => {

  try {

    let response = await axios.get("https://api.twitch.tv/helix/games/top?first=50", {
      headers: {
        'Authorization': process.env.AuthorizationTwitch,
        'Client-Id': process.env.ClientTwitch
      }
    })

    const data = await response.json();
    return data;
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
};

// Trae una lista de juegos, consultada del api de Twitch y retorna solo los Ids.
exports.getIdGames = async (req, res) => {

  try {

    const response = await axios.get('https://api.twitch.tv/helix/games/top?first=50', {
      headers: {
        'Authorization': process.env.AuthorizationTwitch,
        'Client-Id': process.env.ClientTwitch
      }
    })

    const data = await response.json();
    let array = [];

    // prettier-ignore
    data?.data.forEach(element => {
      const {
        id
      } = element;
      array.push(id)
    });

    return array;
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error interno'
    })
  }
}